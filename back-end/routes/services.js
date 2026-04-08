const express = require("express");
const router = express.Router();
const Service = require("../models/service");
const authMiddleware = require("../middleware/authMiddleware");

// GET /api/services - Get all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find()
      .populate("provider", "name email location")
      .sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services", error: error.message });
  }
});

// GET /api/services/provider - Get services by the logged-in provider
router.get("/provider", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "freelancer") {
      return res.status(403).json({ message: "Not authorized." });
    }
    const services = await Service.find({ provider: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching provider services", error: error.message });
  }
});

// POST /api/services - Create a new service
router.post("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "freelancer") {
      return res.status(403).json({ message: "Only freelancers can create services." });
    }

    const { title, description, price, category } = req.body;
    const service = await Service.create({
      title,
      description,
      price,
      category,
      provider: req.user._id,
    });

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: "Error creating service", error: error.message });
  }
});

module.exports = router;
