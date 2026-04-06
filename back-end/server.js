const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ==================== MIDDLEWARE ====================
// CORS allows your frontend (localhost:5173) to communicate with this backend (localhost:5000)
app.use(
  cors({
    origin: "http://localhost:5173",
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

// Simple health check route just to see if the server is running when you visit http://localhost:5000/
app.get("/", (req, res) => {
  res.json({ message: "🚀 Micro Fiverr API is running ok bro!" });
});

// ==================== MONGODB CONNECTION ====================
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

// This connects your backend to the MongoDB database using the URI from your .env file
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");
    // Once the database connects, we start the server listening on the PORT (5000)
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    // If the database connection fails, this will catch the error and show it in the console
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });
