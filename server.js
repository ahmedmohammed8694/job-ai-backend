import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import { randomUUID } from "crypto";
import { DatabaseSync } from "node:sqlite";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//////////////////////////////////////////////////////////////////
// Google OAuth Setup
//////////////////////////////////////////////////////////////////

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//////////////////////////////////////////////////////////////////
// Database Configuration (Cloudflare D1 / Local SQLite Fallback)
//////////////////////////////////////////////////////////////////

const CF_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CF_DATABASE_ID = process.env.CLOUDFLARE_DATABASE_ID;
const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

const isCloudflareConfigured = Boolean(CF_ACCOUNT_ID && CF_DATABASE_ID && CF_API_TOKEN);

let localDb = null;

if (isCloudflareConfigured) {
  console.log("☁️  Using Cloudflare D1 Database");
} else {
  console.log("📁 Cloudflare credentials missing in .env - Falling back to local SQLite (data.sqlite)");
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
}

/**
 * Execute SQL Query on Cloudflare D1 REST API or Local SQLite
 */
async function executeQuery(sql, params = []) {
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
  } else {
    // Local SQLite fallback using node:sqlite
    const isSelect = sql.trim().toUpperCase().startsWith("SELECT");
    const stmt = localDb.prepare(sql);
    if (isSelect) {
      return stmt.all(...params);
    } else {
      stmt.run(...params);
      return [];
    }
  }
}

// Auto-initialize D1 table if using Cloudflare D1
if (isCloudflareConfigured) {
  executeQuery(`
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
  `).then(() => console.log("✅ Cloudflare D1 Schema Initialized"))
    .catch((err) => console.error("⚠️ Cloudflare D1 Schema Init Error:", err.message));
}

//////////////////////////////////////////////////////////////////
// Auth Middleware
//////////////////////////////////////////////////////////////////

async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split("Bearer ")[1];

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    req.user = ticket.getPayload();
    next();

  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

//////////////////////////////////////////////////////////////////
// Routes
//////////////////////////////////////////////////////////////////

// Health Check
app.get("/", (req, res) => {
  res.json({
    status: "Backend running successfully 🚀",
    database: isCloudflareConfigured ? "Cloudflare D1" : "Local SQLite (data.sqlite)"
  });
});

// Track Application
app.post("/api/track", verifyToken, async (req, res) => {
  try {
    const { company, jobTitle, location, applyLink, resumeScore, status } = req.body;
    const id = randomUUID();
    const userEmail = req.user.email;
    const appStatus = status || "Applied";
    const createdAt = new Date().toISOString();

    await executeQuery(
      `INSERT INTO applications (id, userEmail, company, jobTitle, location, applyLink, resumeScore, status, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, userEmail, company, jobTitle, location, applyLink, resumeScore, appStatus, createdAt]
    );

    res.json({ success: true, id });

  } catch (err) {
    console.error("Error saving application:", err);
    res.status(500).json({ error: "Failed to save application" });
  }
});

// Get Applications
app.get("/api/applications", verifyToken, async (req, res) => {
  try {
    const apps = await executeQuery(
      `SELECT * FROM applications WHERE userEmail = ? ORDER BY createdAt DESC`,
      [req.user.email]
    );

    res.json(apps);

  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

// Update Status
app.put("/api/update-status/:id", verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    await executeQuery(
      `UPDATE applications SET status = ? WHERE id = ? AND userEmail = ?`,
      [status, id, req.user.email]
    );

    res.json({ success: true });

  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
});

//////////////////////////////////////////////////////////////////
// Start Server
//////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;