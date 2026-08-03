import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import { randomUUID } from "crypto";
import { DatabaseSync } from "node:sqlite";

dotenv.config();

const app = new Hono();

// Enable CORS for all origins (Tampermonkey, Browser, Web Apps)
app.use("*", cors());

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
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
        resumeUrl TEXT,
        status TEXT DEFAULT 'Applied',
        salary TEXT,
        email TEXT,
        phone TEXT,
        jdText TEXT,
        coverLetter TEXT DEFAULT 'No generated',
        whatsAppMessage TEXT DEFAULT 'No generated',
        emailMessage TEXT DEFAULT 'No generated',
        atsScore INTEGER,
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
// Routes
//////////////////////////////////////////////////////////////////

// Health Check
app.get("/", (c) => {
  return c.json({
    status: "Backend running successfully 🚀",
    database: c.env?.DB ? "Cloudflare D1 (Worker Binding)" : (isCloudflareConfigured ? "Cloudflare D1 (REST API)" : "Local SQLite"),
    storage: c.env?.R2_BUCKET ? "Cloudflare R2 (jobassistantpremium)" : "Local Storage"
  });
});

// Upload Resume to Cloudflare R2 Bucket (jobassistantpremium)
app.post("/api/upload-resume", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get("resume");
    const userEmail = formData.get("userEmail") || "ahmed.mohammed8694@gmail.com";

    if (!file || typeof file === "string") {
      return c.json({ error: "No resume file provided" }, 400);
    }

    const filename = file.name || "resume.pdf";
    const fileKey = `resumes/${userEmail}/${randomUUID()}-${filename}`;
    const contentType = file.type || "application/pdf";
    const arrayBuffer = await file.arrayBuffer();

    // Upload directly to Cloudflare R2 bucket
    if (c.env?.R2_BUCKET) {
      await c.env.R2_BUCKET.put(fileKey, arrayBuffer, {
        httpMetadata: { contentType }
      });
    }

    const fileUrl = `https://job-ai-backend.ahmed-mohammed8694.workers.dev/api/resume/${encodeURIComponent(fileKey)}`;

    return c.json({
      success: true,
      fileKey,
      fileUrl,
      fileName: filename,
      size: file.size
    });

  } catch (err) {
    console.error("Error uploading resume to R2:", err);
    return c.json({ error: "Failed to upload resume", details: err.message }, 500);
  }
});

// Download/View Resume from Cloudflare R2 Bucket
app.get("/api/resume/:key{.+}", async (c) => {
  try {
    const key = c.req.param("key");
    if (!c.env?.R2_BUCKET) {
      return c.json({ error: "R2 bucket is not available in local mode" }, 400);
    }

    const object = await c.env.R2_BUCKET.get(key);
    if (!object) {
      return c.json({ error: "File not found in R2 bucket" }, 404);
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);
    headers.set("Content-Type", object.httpMetadata?.contentType || "application/pdf");
    headers.set("Content-Disposition", "inline");

    return new Response(object.body, { headers });

  } catch (err) {
    console.error("Error retrieving resume from R2:", err);
    return c.json({ error: "Failed to fetch resume" }, 500);
  }
});

// Track Application
app.post("/api/track", async (c) => {
  try {
    const body = await c.req.json();
    const { 
      company, jobTitle, location, applyLink, resumeScore, resumeUrl, status, userEmail,
      salary, email, phone, jdText, coverLetter, whatsAppMessage, emailMessage, atsScore
    } = body;
    
    const ownerEmail = userEmail || "ahmed.mohammed8694@gmail.com";
    const appStatus = status || "Applied";
    const createdAt = new Date().toISOString();

    // Check if an application for this user and link already exists to perform update (upsert fallback)
    const existing = await executeQuery(
      c,
      `SELECT id FROM applications WHERE userEmail = ? AND applyLink = ?`,
      [ownerEmail, applyLink]
    );

    if (existing && existing.length > 0) {
      const appId = existing[0].id;
      await executeQuery(
        c,
        `UPDATE applications SET 
           company = ?, jobTitle = ?, location = ?, resumeScore = ?, resumeUrl = ?, status = ?,
           salary = ?, email = ?, phone = ?, jdText = ?, coverLetter = ?, whatsAppMessage = ?, emailMessage = ?, atsScore = ?
         WHERE id = ?`,
        [
          company, jobTitle, location, resumeScore, resumeUrl || null, appStatus,
          salary || "Not Disclosed", email || "", phone || "", jdText || "", 
          coverLetter || "No generated", whatsAppMessage || "No generated", emailMessage || "No generated", 
          atsScore || resumeScore || 0, appId
        ]
      );
      return c.json({ success: true, id: appId, action: "updated" });
    } else {
      const id = randomUUID();
      await executeQuery(
        c,
        `INSERT INTO applications (id, userEmail, company, jobTitle, location, applyLink, resumeScore, resumeUrl, status, createdAt,
                                   salary, email, phone, jdText, coverLetter, whatsAppMessage, emailMessage, atsScore)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id, ownerEmail, company, jobTitle, location, applyLink, resumeScore, resumeUrl || null, appStatus, createdAt,
          salary || "Not Disclosed", email || "", phone || "", jdText || "", 
          coverLetter || "No generated", whatsAppMessage || "No generated", emailMessage || "No generated", 
          atsScore || resumeScore || 0
        ]
      );
      return c.json({ success: true, id, action: "inserted" });
    }

  } catch (err) {
    console.error("Error saving application:", err);
    return c.json({ error: "Failed to save application" }, 500);
  }
});

// Get Applications
app.get("/api/applications", async (c) => {
  try {
    const email = c.req.query("email") || "ahmed.mohammed8694@gmail.com";
    const apps = await executeQuery(
      c,
      `SELECT * FROM applications WHERE userEmail = ? ORDER BY createdAt DESC`,
      [email]
    );

    return c.json(apps);

  } catch (err) {
    console.error("Error fetching applications:", err);
    return c.json({ error: "Failed to fetch applications" }, 500);
  }
});

// Update Status
app.put("/api/update-status/:id", async (c) => {
  try {
    const { status, userEmail } = await c.req.json();
    const id = c.req.param("id");
    const email = userEmail || "ahmed.mohammed8694@gmail.com";

    await executeQuery(
      c,
      `UPDATE applications SET status = ? WHERE id = ? AND userEmail = ?`,
      [status, id, email]
    );

    return c.json({ success: true });

  } catch (err) {
    console.error("Error updating status:", err);
    return c.json({ error: "Failed to update status" }, 500);
  }
});

// ── AI KEY VAULT ENDPOINTS ──────────────────────────────────────────────────

// Save a new API key to the vault (one owner can have many keys per provider)
app.post("/api/keys/save", async (c) => {
  try {
    const { ownerEmail, provider, apiKey, accountEmail, modelName } = await c.req.json();
    if (!ownerEmail || !provider || !apiKey) {
      return c.json({ error: "Missing required fields: ownerEmail, provider, apiKey" }, 400);
    }

    // Get current max priority for this owner+provider
    const existing = await executeQuery(
      c,
      `SELECT MAX(priority) as maxP FROM user_api_keys WHERE owner_email = ? AND provider = ?`,
      [ownerEmail, provider]
    );
    const nextPriority = ((existing[0]?.maxP ?? -1) + 1);

    await executeQuery(
      c,
      `INSERT INTO user_api_keys (owner_email, provider, api_key, account_email, model_name, priority, is_active, fail_count)
       VALUES (?, ?, ?, ?, ?, ?, 1, 0)`,
      [ownerEmail, provider, apiKey, accountEmail || "", modelName || "", nextPriority]
    );

    return c.json({ success: true, message: `Saved ${provider} key (#${nextPriority}) for ${ownerEmail}` });
  } catch (err) {
    console.error("Error saving API key:", err);
    return c.json({ error: "Failed to save API key" }, 500);
  }
});

// List all active keys for a provider owned by this user
app.get("/api/keys/list", async (c) => {
  try {
    const ownerEmail = c.req.query("ownerEmail");
    const provider = c.req.query("provider");
    if (!ownerEmail) return c.json({ error: "ownerEmail query param required" }, 400);

    const sql = provider
      ? `SELECT id, provider, account_email, model_name, priority, is_active, fail_count, last_used FROM user_api_keys WHERE owner_email = ? AND provider = ? ORDER BY priority ASC`
      : `SELECT id, provider, account_email, model_name, priority, is_active, fail_count, last_used FROM user_api_keys WHERE owner_email = ? ORDER BY provider, priority ASC`;
    const params = provider ? [ownerEmail, provider] : [ownerEmail];

    const keys = await executeQuery(c, sql, params);
    return c.json(keys);
  } catch (err) {
    console.error("Error listing API keys:", err);
    return c.json({ error: "Failed to list API keys" }, 500);
  }
});

// Get the next active key for a provider (for auto-rotation use)
app.get("/api/keys/next", async (c) => {
  try {
    const ownerEmail = c.req.query("ownerEmail");
    const provider = c.req.query("provider");
    if (!ownerEmail || !provider) return c.json({ error: "ownerEmail and provider required" }, 400);

    const keys = await executeQuery(
      c,
      `SELECT id, api_key, account_email, model_name FROM user_api_keys
       WHERE owner_email = ? AND provider = ? AND is_active = 1
       ORDER BY priority ASC LIMIT 1`,
      [ownerEmail, provider]
    );

    if (!keys.length) return c.json({ error: "No active keys found for this provider" }, 404);
    return c.json(keys[0]);
  } catch (err) {
    console.error("Error getting next key:", err);
    return c.json({ error: "Failed to get next key" }, 500);
  }
});

// Mark a key as failed (quota hit), rotate to next
app.post("/api/keys/rotate", async (c) => {
  try {
    const { keyId, ownerEmail, provider } = await c.req.json();
    if (!keyId || !ownerEmail || !provider) return c.json({ error: "keyId, ownerEmail, provider required" }, 400);

    // Increment fail_count for the failed key; deactivate if fail_count >= 3
    await executeQuery(
      c,
      `UPDATE user_api_keys SET fail_count = fail_count + 1,
       is_active = CASE WHEN fail_count + 1 >= 3 THEN 0 ELSE 1 END
       WHERE id = ?`,
      [keyId]
    );

    // Return next active key for this provider
    const keys = await executeQuery(
      c,
      `SELECT id, api_key, account_email, model_name FROM user_api_keys
       WHERE owner_email = ? AND provider = ? AND is_active = 1 AND id != ?
       ORDER BY priority ASC LIMIT 1`,
      [ownerEmail, provider, keyId]
    );

    if (!keys.length) return c.json({ error: "No more active keys for this provider" }, 404);
    return c.json({ success: true, nextKey: keys[0] });
  } catch (err) {
    console.error("Error rotating key:", err);
    return c.json({ error: "Failed to rotate key" }, 500);
  }
});

// Delete a key from the vault
app.delete("/api/keys/delete/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const ownerEmail = c.req.query("ownerEmail");
    if (!ownerEmail) return c.json({ error: "ownerEmail required" }, 400);

    await executeQuery(
      c,
      `DELETE FROM user_api_keys WHERE id = ? AND owner_email = ?`,
      [id, ownerEmail]
    );
    return c.json({ success: true });
  } catch (err) {
    console.error("Error deleting key:", err);
    return c.json({ error: "Failed to delete key" }, 500);
  }
});



// Get the next active key for a provider (for auto-rotation use)
app.get("/api/keys/next", async (c) => {
  try {
    const ownerEmail = c.req.query("ownerEmail");
    const provider = c.req.query("provider");
    if (!ownerEmail || !provider) return c.json({ error: "ownerEmail and provider required" }, 400);

    const keys = await executeQuery(
      c,
      `SELECT id, api_key, account_email, model_name FROM user_api_keys
       WHERE owner_email = ? AND provider = ? AND is_active = 1
       ORDER BY priority ASC LIMIT 1`,
      [ownerEmail, provider]
    );

    if (!keys.length) return c.json({ error: "No active keys found for this provider" }, 404);
    return c.json(keys[0]);
  } catch (err) {
    console.error("Error getting next key:", err);
    return c.json({ error: "Failed to get next key" }, 500);
  }
});

// Mark a key as failed (quota hit), rotate to next
app.post("/api/keys/rotate", async (c) => {
  try {
    const { keyId, ownerEmail, provider } = await c.req.json();
    if (!keyId || !ownerEmail || !provider) return c.json({ error: "keyId, ownerEmail, provider required" }, 400);

    // Increment fail_count for the failed key; deactivate if fail_count >= 3
    await executeQuery(
      c,
      `UPDATE user_api_keys SET fail_count = fail_count + 1,
       is_active = CASE WHEN fail_count + 1 >= 3 THEN 0 ELSE 1 END
       WHERE id = ?`,
      [keyId]
    );

    // Return next active key for this provider
    const keys = await executeQuery(
      c,
      `SELECT id, api_key, account_email, model_name FROM user_api_keys
       WHERE owner_email = ? AND provider = ? AND is_active = 1 AND id != ?
       ORDER BY priority ASC LIMIT 1`,
      [ownerEmail, provider, keyId]
    );

    if (!keys.length) return c.json({ error: "No more active keys for this provider" }, 404);
    return c.json({ success: true, nextKey: keys[0] });
  } catch (err) {
    console.error("Error rotating key:", err);
    return c.json({ error: "Failed to rotate key" }, 500);
  }
});

// Delete a key from the vault
app.delete("/api/keys/delete/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const ownerEmail = c.req.query("ownerEmail");
    if (!ownerEmail) return c.json({ error: "ownerEmail required" }, 400);

    await executeQuery(
      c,
      `DELETE FROM user_api_keys WHERE id = ? AND owner_email = ?`,
      [id, ownerEmail]
    );
    return c.json({ success: true });
  } catch (err) {
    console.error("Error deleting key:", err);
    return c.json({ error: "Failed to delete key" }, 500);
  }
});

// Render Job Dashboard Page
app.get("/dashboard", async (c) => {
  const email = c.req.query("email") || "ahmed.mohammed8694@gmail.com";
  
  // Fetch all applications for this email
  const apps = await executeQuery(
    c,
    `SELECT * FROM applications WHERE userEmail = ? ORDER BY createdAt DESC`,
    [email]
  );

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Job Application Dashboard</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-gradient: radial-gradient(circle at 10% 20%, #0d1117 0%, #161b22 90%);
      --card-bg: rgba(22, 27, 34, 0.6);
      --card-border: rgba(48, 54, 61, 0.5);
      --glass-glow: rgba(56, 139, 253, 0.1);
      --text-main: #e6edf3;
      --text-muted: #8b949e;
      --accent-color: #58a6ff;
      --accent-green: #3fb950;
      --accent-purple: #bc8cff;
      --accent-red: #f85149;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    body {
      background: var(--bg-gradient);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
    }

    header {
      backdrop-filter: blur(12px);
      background: rgba(13, 17, 23, 0.7);
      border-bottom: 1px solid var(--card-border);
      position: sticky;
      top: 0;
      z-index: 100;
      padding: 16px 5%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 24px;
      font-weight: 800;
      background: linear-gradient(135deg, #58a6ff, #bc8cff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .user-info {
      font-size: 14px;
      color: var(--text-muted);
      background: rgba(255, 255, 255, 0.03);
      padding: 8px 16px;
      border-radius: 99px;
      border: 1px solid var(--card-border);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .user-info strong {
      color: var(--accent-color);
    }

    main {
      flex: 1;
      max-width: 1300px;
      width: 90%;
      margin: 32px auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
    }

    .stat-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 20px;
      position: relative;
      overflow: hidden;
      transition: transform 0.2s, border-color 0.2s;
    }

    .stat-card:hover {
      transform: translateY(-2px);
      border-color: rgba(88, 166, 255, 0.4);
    }

    .stat-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background: radial-gradient(circle at top left, var(--glass-glow), transparent 60%);
      pointer-events: none;
    }

    .stat-label {
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--text-muted);
      margin-bottom: 8px;
    }

    .stat-value {
      font-size: 32px;
      font-weight: 700;
      color: var(--text-main);
    }

    .stat-value.green { color: var(--accent-green); }
    .stat-value.purple { color: var(--accent-purple); }
    .stat-value.blue { color: var(--accent-color); }

    /* Filters Bar */
    .filters-bar {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      background: rgba(22, 27, 34, 0.4);
      padding: 16px;
      border-radius: 12px;
      border: 1px solid var(--card-border);
      align-items: center;
    }

    .search-wrapper {
      flex: 1;
      min-width: 280px;
      position: relative;
    }

    .search-wrapper input {
      width: 100%;
      padding: 12px 16px 12px 40px;
      background: #0d1117;
      border: 1px solid var(--card-border);
      border-radius: 8px;
      color: var(--text-main);
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
    }

    .search-wrapper input:focus {
      border-color: var(--accent-color);
      box-shadow: 0 0 0 2px rgba(88, 166, 255, 0.15);
    }

    .search-icon {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
    }

    .select-wrapper select {
      padding: 12px 24px;
      background: #0d1117;
      border: 1px solid var(--card-border);
      border-radius: 8px;
      color: var(--text-main);
      font-size: 14px;
      outline: none;
      cursor: pointer;
      min-width: 160px;
    }

    /* Applications Table / Cards */
    .table-container {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      overflow: hidden;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 14px;
    }

    th {
      background: rgba(13, 17, 23, 0.6);
      padding: 16px 20px;
      font-weight: 600;
      color: var(--text-muted);
      border-bottom: 1px solid var(--card-border);
    }

    td {
      padding: 16px 20px;
      border-bottom: 1px solid var(--card-border);
      color: var(--text-main);
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr.app-row {
      cursor: pointer;
      transition: background-color 0.2s;
    }

    tr.app-row:hover {
      background-color: rgba(255, 255, 255, 0.02);
    }

    .role-title {
      font-weight: 600;
      color: #fff;
    }

    .company-name {
      color: var(--text-muted);
      font-size: 13px;
      margin-top: 2px;
    }

    /* Status Badges */
    .status-badge {
      display: inline-flex;
      align-items: center;
      padding: 4px 10px;
      border-radius: 99px;
      font-size: 12px;
      font-weight: 600;
    }

    .status-badge.applied { background: rgba(56, 139, 253, 0.15); color: var(--accent-color); border: 1px solid rgba(88, 166, 255, 0.3); }
    .status-badge.interviewing { background: rgba(188, 140, 255, 0.15); color: var(--accent-purple); border: 1px solid rgba(188, 140, 255, 0.3); }
    .status-badge.offered { background: rgba(63, 185, 80, 0.15); color: var(--accent-green); border: 1px solid rgba(63, 185, 80, 0.3); }
    .status-badge.rejected { background: rgba(248, 81, 73, 0.15); color: var(--accent-red); border: 1px solid rgba(248, 81, 73, 0.3); }

    .ats-score {
      font-weight: 700;
      color: var(--accent-purple);
    }

    .no-data {
      padding: 48px;
      text-align: center;
      color: var(--text-muted);
    }

    /* Modal Styling */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(8px);
      z-index: 1000;
      display: none;
      align-items: center;
      justify-content: center;
    }

    .modal-content {
      background: #0d1117;
      border: 1px solid var(--card-border);
      border-radius: 20px;
      width: 750px;
      max-width: 95%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 25px 60px rgba(0,0,0,0.8);
      position: relative;
    }

    .modal-header {
      padding: 20px 24px;
      border-bottom: 1px solid var(--card-border);
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .modal-title-wrapper h2 {
      font-size: 20px;
      font-weight: 700;
      color: #fff;
    }

    .modal-title-wrapper p {
      color: var(--text-muted);
      font-size: 13px;
      margin-top: 4px;
    }

    .close-btn {
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 20px;
      cursor: pointer;
      outline: none;
    }

    .close-btn:hover {
      color: #fff;
    }

    .modal-body {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .details-row {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .detail-item {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--card-border);
      border-radius: 10px;
      padding: 12px;
    }

    .detail-item label {
      display: block;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-muted);
      margin-bottom: 4px;
    }

    .detail-item span, .detail-item a {
      font-size: 14px;
      font-weight: 500;
      color: var(--text-main);
      text-decoration: none;
    }

    .detail-item a {
      color: var(--accent-color);
    }
    .detail-item a:hover {
      text-decoration: underline;
    }

    .jd-box {
      border: 1px solid var(--card-border);
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.2);
      padding: 16px;
      max-height: 180px;
      overflow-y: auto;
      font-size: 13px;
      line-height: 1.5;
      color: var(--text-muted);
      white-space: pre-wrap;
    }

    /* Tabs inside Modal */
    .tabs-nav {
      display: flex;
      border-bottom: 1px solid var(--card-border);
      margin-top: 10px;
    }

    .tab-btn {
      padding: 12px 20px;
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      outline: none;
    }

    .tab-btn.active {
      color: var(--accent-color);
      border-bottom-color: var(--accent-color);
    }

    .tab-content {
      display: none;
      padding-top: 16px;
      position: relative;
    }

    .tab-content.active {
      display: block;
    }

    .template-box {
      width: 100%;
      height: 200px;
      padding: 12px;
      background: #161b22;
      border: 1px solid var(--card-border);
      border-radius: 8px;
      color: var(--text-main);
      font-size: 13px;
      line-height: 1.45;
      outline: none;
      resize: none;
    }

    .copy-btn {
      position: absolute;
      right: 12px;
      top: 28px;
      background: var(--accent-color);
      color: #0d1117;
      border: none;
      border-radius: 6px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .copy-btn:hover {
      opacity: 0.9;
    }

    .status-select {
      background: #161b22;
      border: 1px solid var(--card-border);
      color: #fff;
      padding: 6px 12px;
      border-radius: 6px;
      outline: none;
      cursor: pointer;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .details-row {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>

  <header>
    <div class="logo">📋 Job Applications Dashboard</div>
    <div class="user-info">
      👤 User: <strong id="userEmailHeader">${email}</strong>
    </div>
  </header>

  <main>
    <!-- Stats Grid -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Total Applications</div>
        <div class="stat-value blue" id="totalCount">0</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Interviewing</div>
        <div class="stat-value purple" id="interviewCount">0</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Avg ATS Score</div>
        <div class="stat-value green" id="avgAts">0%</div>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters-bar">
      <div class="search-wrapper">
        <span class="search-icon">🔍</span>
        <input type="text" id="searchInput" placeholder="Search by role, company, or location...">
      </div>
      <div class="select-wrapper">
        <select id="statusFilter">
          <option value="all">All Statuses</option>
          <option value="applied">Applied</option>
          <option value="interviewing">Interviewing</option>
          <option value="offered">Offered</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="table-container">
      <table id="appsTable">
        <thead>
          <tr>
            <th>Role & Company</th>
            <th>Location</th>
            <th>Salary</th>
            <th>ATS Score</th>
            <th>Status</th>
            <th>Date Tracked</th>
          </tr>
        </thead>
        <tbody id="tableBody">
          <!-- Rows dynamically inserted -->
        </tbody>
      </table>
    </div>
  </main>

  <!-- Job Details Modal -->
  <div class="modal-overlay" id="detailsModal">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title-wrapper">
          <h2 id="modalRole">Software Engineer</h2>
          <p id="modalCompany">Google</p>
        </div>
        <button class="close-btn" id="closeModal">✖</button>
      </div>
      
      <div class="modal-body">
        <!-- Status Changer -->
        <div class="detail-item" style="display:flex; justify-content:space-between; align-items:center;">
          <label style="margin-bottom:0;">Change Status:</label>
          <select id="modalStatusSelect" class="status-select">
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offered">Offered</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <!-- Info Grid -->
        <div class="details-row">
          <div class="detail-item">
            <label>Location</label>
            <span id="modalLoc">Hyderabad, India</span>
          </div>
          <div class="detail-item">
            <label>Salary</label>
            <span id="modalSal">Not Disclosed</span>
          </div>
          <div class="detail-item">
            <label>HR Email</label>
            <span id="modalHrEmail">hr@company.com</span>
          </div>
          <div class="detail-item">
            <label>HR Phone</label>
            <span id="modalHrPhone">N/A</span>
          </div>
          <div class="detail-item">
            <label>Job Portal Link</label>
            <a href="#" target="_blank" id="modalPortalLink">Open Link ↗</a>
          </div>
          <div class="detail-item">
            <label>Resume Used</label>
            <a href="#" target="_blank" id="modalResumeLink">View Resume ↗</a>
          </div>
        </div>

        <!-- Job Description -->
        <div>
          <h4 style="margin-bottom:8px; font-size:12px; color:var(--text-muted);">JOB DESCRIPTION</h4>
          <div class="jd-box" id="modalJd">Loading...</div>
        </div>

        <!-- Dynamic Message Tabs -->
        <div>
          <h4 style="margin-bottom:8px; font-size:12px; color:var(--text-muted);">GENERATED TEMPLATES</h4>
          <div class="tabs-nav">
            <button class="tab-btn active" data-target="emailTab">✉️ Email Message</button>
            <button class="tab-btn" data-target="waTab">💬 WhatsApp</button>
            <button class="tab-btn" data-target="coverTab">📄 Cover Letter</button>
          </div>

          <div class="tab-content active" id="emailTab">
            <button class="copy-btn" onclick="copyTemplate('emailText')">📋 Copy</button>
            <textarea class="template-box" id="emailText" readonly></textarea>
          </div>
          <div class="tab-content" id="waTab">
            <button class="copy-btn" onclick="copyTemplate('waText')">📋 Copy</button>
            <textarea class="template-box" id="waText" readonly></textarea>
          </div>
          <div class="tab-content" id="coverTab">
            <button class="copy-btn" onclick="copyTemplate('coverText')">📋 Copy</button>
            <textarea class="template-box" id="coverText" readonly></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    const userApplications = ${JSON.stringify(apps)};
    let activeAppId = null;

    // Load Stats and Table
    function renderDashboard() {
      const tbody = document.getElementById("tableBody");
      const search = document.getElementById("searchInput").value.toLowerCase();
      const statusFilter = document.getElementById("statusFilter").value;

      tbody.innerHTML = "";

      let filtered = userApplications.filter(app => {
        const title = (app.jobTitle || "").toLowerCase();
        const company = (app.company || "").toLowerCase();
        const loc = (app.location || "").toLowerCase();
        const matchesSearch = title.includes(search) || company.includes(search) || loc.includes(search);
        
        if (statusFilter === "all") return matchesSearch;
        return matchesSearch && (app.status || "").toLowerCase() === statusFilter;
      });

      // Update counters
      document.getElementById("totalCount").textContent = userApplications.length;
      document.getElementById("interviewCount").textContent = userApplications.filter(a => (a.status || "").toLowerCase() === "interviewing").length;
      
      const scores = userApplications.map(a => Number(a.atsScore || a.resumeScore || 0)).filter(s => s > 0);
      const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
      document.getElementById("avgAts").textContent = avg + "%";

      if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="no-data">🔍 No applications match your filter.</td></tr>';
        return;
      }

      filtered.forEach(app => {
        const row = document.createElement("tr");
        row.className = "app-row";
        
        const date = new Date(app.createdAt).toLocaleDateString("en-IN", {
          day: "numeric", month: "short", year: "numeric"
        });

        const statusClass = (app.status || "Applied").toLowerCase();

        row.innerHTML = \`
          <td>
            <div class="role-title">\${app.jobTitle || "N/A"}</div>
            <div class="company-name">\${app.company || "N/A"}</div>
          </td>
          <td>\${app.location || "N/A"}</td>
          <td>\${app.salary || "Not Disclosed"}</td>
          <td class="ats-score">\${app.atsScore || app.resumeScore || 0}%</td>
          <td>
            <span class="status-badge \${statusClass}">\${app.status || "Applied"}</span>
          </td>
          <td style="color: var(--text-muted);">\${date}</td>
        \`;

        row.onclick = () => openDetailsModal(app);
        tbody.appendChild(row);
      });
    }

    function openDetailsModal(app) {
      activeAppId = app.id;
      document.getElementById("modalRole").textContent = app.jobTitle || "N/A";
      document.getElementById("modalCompany").textContent = app.company || "N/A";
      document.getElementById("modalLoc").textContent = app.location || "N/A";
      document.getElementById("modalSal").textContent = app.salary || "Not Disclosed";
      document.getElementById("modalHrEmail").textContent = app.email || "N/A";
      document.getElementById("modalHrPhone").textContent = app.phone || "N/A";
      document.getElementById("modalJd").textContent = app.jdText || "No job description text logged.";
      
      const statusSelect = document.getElementById("modalStatusSelect");
      statusSelect.value = app.status || "Applied";

      // Links
      const portal = document.getElementById("modalPortalLink");
      if (app.applyLink) { portal.href = app.applyLink; portal.style.display = "inline"; }
      else portal.style.display = "none";

      const resume = document.getElementById("modalResumeLink");
      if (app.resumeUrl) { resume.href = app.resumeUrl; resume.style.display = "inline"; }
      else resume.style.display = "none";

      // Messages
      document.getElementById("emailText").value = app.emailMessage || "No generated";
      document.getElementById("waText").value = app.whatsAppMessage || "No generated";
      document.getElementById("coverText").value = app.coverLetter || "No generated";

      // Reset Tabs
      document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
      document.querySelector(".tab-btn[data-target='emailTab']").classList.add("active");
      document.getElementById("emailTab").classList.add("active");

      document.getElementById("detailsModal").style.display = "flex";
    }

    function closeDetailsModal() {
      document.getElementById("detailsModal").style.display = "none";
      activeAppId = null;
    }

    async function updateAppStatus(newStatus) {
      if (!activeAppId) return;
      try {
        const res = await fetch(\`/api/update-status/\${activeAppId}\`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus, userEmail: "${email}" })
        });
        if (res.ok) {
          // Update local state
          const app = userApplications.find(a => a.id === activeAppId);
          if (app) {
            app.status = newStatus;
            renderDashboard();
          }
        }
      } catch (err) {
        console.error("Failed to update status on server:", err);
      }
    }

    function copyTemplate(elemId) {
      const txt = document.getElementById(elemId);
      txt.select();
      document.execCommand("copy");
      alert("📋 Copied to clipboard!");
    }

    // Bind Listeners
    document.getElementById("searchInput").oninput = renderDashboard;
    document.getElementById("statusFilter").onchange = renderDashboard;
    document.getElementById("closeModal").onclick = closeDetailsModal;
    
    document.getElementById("modalStatusSelect").onchange = function() {
      updateAppStatus(this.value);
    };

    // Tabs logic
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.onclick = function() {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
        
        this.classList.add("active");
        document.getElementById(this.dataset.target).classList.add("active");
      };
    });

    // Close on overlay click
    window.onclick = function(e) {
      const overlay = document.getElementById("detailsModal");
      if (e.target === overlay) closeDetailsModal();
    };

    // Initial Load
    renderDashboard();
  </script>
</body>
</html>`;

  return c.html(html);
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