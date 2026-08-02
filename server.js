import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import { randomUUID } from "crypto";
import { DatabaseSync } from "node:sqlite";

dotenv.config();

const app = new Hono();

// Enable CORS
app.use("*", cors());

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

//////////////////////////////////////////////////////////////////
// Database Configuration (Cloudflare D1 / Local SQLite Fallback)
//////////////////////////////////////////////////////////////////

const CF_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CF_DATABASE_ID = process.env.CLOUDFLARE_DATABASE_ID;
const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

const isCloudflareConfigured = Boolean(CF_ACCOUNT_ID && CF_DATABASE_ID && CF_API_TOKEN);

let localDb = null;

if (!isCloudflareConfigured) {
  try {
    localDb = new DatabaseSync("data.sqlite");
    localDb.exec(`
      CREATE TABLE IF NOT EXISTS applications (
        id TEXT PRIMARY KEY,
        userEmail TEXT NOT NULL,
        company TEXT,
        jobTitle TEXT,
        location TEXT,
        applyLink TEXT,
        resumeScore REAL,
        status TEXT DEFAULT 'Applied',
        createdAt TEXT DEFAULT (datetime('now'))
      );
    `);
  } catch (e) {
    // Ignore in worker environment
  }
}

/**
 * Execute SQL Query on Cloudflare D1 (via worker binding or REST API) or Local SQLite
 */
async function executeQuery(c, sql, params = []) {
  // If running inside Cloudflare Worker with D1 binding (env.DB)
  if (c.env?.DB) {
    const stmt = c.env.DB.prepare(sql).bind(...params);
    const isSelect = sql.trim().toUpperCase().startsWith("SELECT");
    if (isSelect) {
      const res = await stmt.all();
      return res.results || [];
    } else {
      await stmt.run();
      return [];
    }
  }

  // If using Cloudflare REST API via .env tokens
  if (isCloudflareConfigured) {
    const url = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/d1/database/${CF_DATABASE_ID}/query`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CF_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ sql, params })
    });

    const data = await response.json();
    if (!data.success) {
      const errorMsg = data.errors?.[0]?.message || "Cloudflare D1 Query Failed";
      throw new Error(errorMsg);
    }
    return data.result[0]?.results || [];
  }

  // Local SQLite fallback
  if (localDb) {
    const isSelect = sql.trim().toUpperCase().startsWith("SELECT");
    const stmt = localDb.prepare(sql);
    if (isSelect) {
      return stmt.all(...params);
    } else {
      stmt.run(...params);
      return [];
    }
  }

  return [];
}

//////////////////////////////////////////////////////////////////
// Auth Middleware
//////////////////////////////////////////////////////////////////

async function verifyToken(c, next) {
  try {
    const authHeader = c.req.header("Authorization");
    if (!authHeader) return c.json({ error: "No token provided" }, 401);

    const token = authHeader.split("Bearer ")[1];
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID
    });

    c.set("user", ticket.getPayload());
    await next();

  } catch (err) {
    return c.json({ error: "Invalid or expired token" }, 401);
  }
}

//////////////////////////////////////////////////////////////////
// Routes
//////////////////////////////////////////////////////////////////

// Health Check
app.get("/", (c) => {
  return c.json({
    status: "Backend running successfully 🚀",
    database: c.env?.DB ? "Cloudflare D1 (Worker Binding)" : (isCloudflareConfigured ? "Cloudflare D1 (REST API)" : "Local SQLite")
  });
});

// Track Application
app.post("/api/track", verifyToken, async (c) => {
  try {
    const body = await c.req.json();
    const { company, jobTitle, location, applyLink, resumeScore, status } = body;
    const id = randomUUID();
    const user = c.get("user");
    const userEmail = user.email;
    const appStatus = status || "Applied";
    const createdAt = new Date().toISOString();

    await executeQuery(
      c,
      `INSERT INTO applications (id, userEmail, company, jobTitle, location, applyLink, resumeScore, status, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, userEmail, company, jobTitle, location, applyLink, resumeScore, appStatus, createdAt]
    );

    return c.json({ success: true, id });

  } catch (err) {
    console.error("Error saving application:", err);
    return c.json({ error: "Failed to save application" }, 500);
  }
});

// Get Applications
app.get("/api/applications", verifyToken, async (c) => {
  try {
    const user = c.get("user");
    const apps = await executeQuery(
      c,
      `SELECT * FROM applications WHERE userEmail = ? ORDER BY createdAt DESC`,
      [user.email]
    );

    return c.json(apps);

  } catch (err) {
    console.error("Error fetching applications:", err);
    return c.json({ error: "Failed to fetch applications" }, 500);
  }
});

// Update Status
app.put("/api/update-status/:id", verifyToken, async (c) => {
  try {
    const { status } = await c.req.json();
    const id = c.req.param("id");
    const user = c.get("user");

    await executeQuery(
      c,
      `UPDATE applications SET status = ? WHERE id = ? AND userEmail = ?`,
      [status, id, user.email]
    );

    return c.json({ success: true });

  } catch (err) {
    console.error("Error updating status:", err);
    return c.json({ error: "Failed to update status" }, 500);
  }
});

// Local Node.js server runner (when running npm run dev)
if (process.env.NODE_ENV !== "production") {
  const port = Number(process.env.PORT) || 5000;
  console.log(`🚀 Hono Backend Server listening on http://localhost:${port}`);
  serve({
    fetch: app.fetch,
    port
  });
}

// Cloudflare Workers entrypoint
export default app;