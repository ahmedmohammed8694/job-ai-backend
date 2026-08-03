-- Cloudflare D1 Database Schema for Job AI Backend

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
  createdAt TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS user_api_keys (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  owner_email TEXT NOT NULL,
  provider TEXT NOT NULL,
  api_key TEXT NOT NULL,
  account_email TEXT,
  model_name TEXT,
  priority INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  fail_count INTEGER DEFAULT 0,
  last_used DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
