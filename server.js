import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

//////////////////////////////////////////////////////////////////
// GOOGLE AUTH CLIENT
//////////////////////////////////////////////////////////////////

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//////////////////////////////////////////////////////////////////
// MONGODB CONNECTION
//////////////////////////////////////////////////////////////////

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

//////////////////////////////////////////////////////////////////
// SCHEMA
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
// AUTH MIDDLEWARE
//////////////////////////////////////////////////////////////////

async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "No authorization header" });
    }

    const token = authHeader.split("Bearer ")[1];

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    req.user = payload;

    next();

  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

//////////////////////////////////////////////////////////////////
// ROUTES
//////////////////////////////////////////////////////////////////

// Health Check
app.get("/", (req, res) => {
  res.json({ status: "Backend running successfully 🚀" });
});

// Track Application
app.post("/api/track", verifyToken, async (req, res) => {
  try {
    const newApplication = new Application({
      userEmail: req.user.email,
      ...req.body
    });

    await newApplication.save();

    res.json({
      success: true,
      message: "Application saved successfully"
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to save application" });
  }
});

// Get Applications
app.get("/api/applications", verifyToken, async (req, res) => {
  try {
    const apps = await Application.find({ userEmail: req.user.email })
      .sort({ createdAt: -1 });

    res.json(apps);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

// Update Status
app.put("/api/update-status/:id", verifyToken, async (req, res) => {
  try {
    const { status } = req.body;

    await Application.findByIdAndUpdate(req.params.id, { status });

    res.json({ success: true });

  } catch (error) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

//////////////////////////////////////////////////////////////////
// START SERVER
//////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
