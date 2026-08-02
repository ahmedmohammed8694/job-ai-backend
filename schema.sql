-- Cloudflare D1 Database Schema for Job AI Backend

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
