const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ==================== MIDDLEWARE ====================
// CORS configuration
// In development, we can be more permissive to rule out CORS-origin mismatches
app.use(
  cors({
    origin: true, // Allow all origins in dev
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// express.json() allows your app to parse JSON data sent from the frontend (like form submissions)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging with status codes (placed after body parser to log bodies)
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`📡 [Incoming] ${req.method} ${req.url}`);
  if (req.url.startsWith('/api/auth') && req.method === 'POST') {
    console.log(`📦 Body:`, { ...req.body, password: '***' });
  }
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`✅ [Finished] ${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// ==================== ROUTES ====================
const authRoutes = require("./routes/auth");

// This connects the "/api/auth" URL to all the logic inside "routes/auth.js"
app.use("/api/auth", authRoutes);
app.use("/api/jobs", require("./routes/jobs"));

// Simple health check route just to see if the server is running when you visit http://localhost:5000/
app.get("/", (req, res) => {
  res.json({ message: "🚀 Micro Fiverr API is running ok bro!" });
});

// ==================== CATCH ALL 404 (JSON) ====================
// This prevents the "OpaqueResponseBlocking" error by ensuring we don't return HTML
app.use((req, res) => {
  res.status(404).json({ message: "⚠️ Route not found. Check your API URL." });
});

// ==================== GLOBAL ERROR HANDLER ====================
app.use((err, req, res, next) => {
  console.error("❌ Global Error:", err.stack);
  res.status(500).json({ message: "🔥 Something went wrong on the server!" });
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
