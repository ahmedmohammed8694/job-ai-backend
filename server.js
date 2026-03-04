import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

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
// MongoDB Connection
//////////////////////////////////////////////////////////////////

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Error:", err);
    process.exit(1);
  });

//////////////////////////////////////////////////////////////////
// Schema
//////////////////////////////////////////////////////////////////

const ApplicationSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  company: String,
  jobTitle: String,
  location: String,
  applyLink: String,
  resumeScore: Number,
  status: {
    type: String,
    default: "Applied"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Application = mongoose.model("Application", ApplicationSchema);

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
  res.json({ status: "Backend running successfully 🚀" });
});

// Track Application
app.post("/api/track", verifyToken, async (req, res) => {
  try {
    const application = new Application({
      userEmail: req.user.email,
      ...req.body
    });

    await application.save();

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: "Failed to save application" });
  }
});

// Get Applications
app.get("/api/applications", verifyToken, async (req, res) => {
  try {
    const apps = await Application.find({ userEmail: req.user.email })
      .sort({ createdAt: -1 });

    res.json(apps);

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

// Update Status
app.put("/api/update-status/:id", verifyToken, async (req, res) => {
  try {
    await Application.findByIdAndUpdate(req.params.id, {
      status: req.body.status
    });

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

//////////////////////////////////////////////////////////////////
// Start Server
//////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});