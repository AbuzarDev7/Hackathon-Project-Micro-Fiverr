const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ==================== MIDDLEWARE ====================
// CORS allows your frontend (localhost:5173) to communicate with this backend (localhost:5000)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
];

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174"],
    credentials: true,
  }),
);

// express.json() allows your app to parse JSON data sent from the frontend (like form submissions)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== ROUTES ====================
const authRoutes = require("./routes/auth");

// This connects the "/api/auth" URL to all the logic inside "routes/auth.js"
app.use("/api/auth", authRoutes);
app.use("/api/jobs", require("./routes/jobs"));
app.use("/api/services", require("./routes/services"));
app.use("/api/chat", require("./routes/chat"));
app.use("/api/reviews", require("./routes/reviews"));

// Simple health check route just to see if the server is running when you visit http://localhost:5000/
app.get("/", (req, res) => {
  res.json({ message: "🚀 Micro Fiverr API is running ok bro!" });
});

// ==================== MONGODB CONNECTION ====================
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected Successfully!");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    console.log("⏳ Retrying MongoDB connection in 5 seconds...");
    setTimeout(connectDB, 5000);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected! Waiting for Mongoose to reconnect...");
});

mongoose.connection.on("reconnected", () => {
  console.log("✅ MongoDB reconnected successfully!");
});

// Start the Express server unconditionally to ensure APIs remain reachable
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Connect to Database
connectDB();
