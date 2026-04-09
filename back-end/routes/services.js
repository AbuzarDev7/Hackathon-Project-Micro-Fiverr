const express = require("express");
const router = express.Router();
const Service = require("../models/service");
const { protect, authorize } = require("../middleware/authMiddleware");

// GET /api/services - Get all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find()
      .populate("providerId", "name email location lat long avatar")
      .sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services", error: error.message });
  }
});

// GET /api/services/provider - Get services by the logged-in provider
router.get("/provider", protect, authorize("freelancer"), async (req, res) => {
  try {
    const services = await Service.find({ providerId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching provider services", error: error.message });
  }
});

// POST /api/services - Create a new service
router.post("/", protect, authorize("freelancer"), async (req, res) => {
  try {
    console.log("📥 [Body] Post Service:", req.body);
    const { title, description, price, category, location, image } = req.body;
    
    // Validate required fields explicitly
    if (!title || !description || !price || !category || !location) {
      return res.status(400).json({ message: "All fields except image are required." });
    }

    const service = await Service.create({
      title,
      description,
      price: Number(price), // Ensure it's a number
      category,
      location,
      image,
      providerId: req.user._id,
    });

    console.log("✅ [Success] Service created:", service._id);
    res.status(201).json(service);
  } catch (error) {
    console.error("❌ [Error] Creating service:", error);
    res.status(500).json({ message: "Error creating service", error: error.message });
  }
});

module.exports = router;
