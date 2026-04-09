const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const { protect } = require("../middleware/authMiddleware");

// GET /api/bookings/user/active - Get all active bookings for the logged-in client
router.get("/user/active", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.user._id, status: { $in: ["Active", "Paid"] } })
      .populate("providerId", "name avatar location lat long")
      .populate("serviceId", "title price")
      .sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user bookings", error: error.message });
  }
});

// GET /api/bookings/:id - Get booking details with provider and customer locations
router.get("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("providerId", "name avatar lat long phone")
      .populate("customerId", "name lat long")
      .populate("serviceId", "title price");
    
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking", error: error.message });
  }
});

module.exports = router;
