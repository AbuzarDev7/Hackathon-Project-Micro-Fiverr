const express = require("express");
const router = express.Router();
const Job = require("../models/job");
const { protect, authorize } = require("../middleware/authMiddleware");

// @desc    Get all open jobs
// @route   GET /api/jobs
// @access  Public
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find({ status: "open" }).populate("postedBy", "name email");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    Get jobs posted by the logged-in client
// @route   GET /api/jobs/client
// @access  Private (Client only)
router.get("/client", protect, authorize("client"), async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id }).populate("applicants", "name email");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private (Client only)
router.post("/", protect, authorize("client"), async (req, res) => {
  const { title, description, budget, location } = req.body;
  
  try {
    const job = await Job.create({
      title,
      description,
      budget,
      location,
      postedBy: req.user._id
    });
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @desc    Apply to a job
// @route   PUT /api/jobs/:id/apply
// @access  Private (Freelancer only)
router.put("/:id/apply", protect, authorize("freelancer"), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    
    if (job.applicants.includes(req.user._id)) {
      return res.status(400).json({ message: "Already applied" });
    }
    
    job.applicants.push(req.user._id);
    await job.save();
    res.json({ success: true, message: "Applied successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
