const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ==================== MIDDLEWARE ====================
// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Request logging with status codes
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// express.json() allows your app to parse JSON data sent from the frontend (like form submissions)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== ROUTES ====================
const authRoutes = require("./routes/auth");

// This connects the "/api/auth" URL to all the logic inside "routes/auth.js"
app.use("/api/auth", authRoutes);

// Simple health check route just to see if the server is running when you visit http://localhost:5000/
app.get("/", (req, res) => {
  res.json({ message: "🚀 Micro Fiverr API is running ok bro!" });
});

// ==================== SERVER & DATABASE ====================
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

// Start the server FIRST so it's always reachable from the frontend
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 Use the Health Check: http://localhost:${PORT}/`);
});

// Then try to connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    console.log("⚠️  Note: Your server is RUNNING but database is NOT connected.");
  });
