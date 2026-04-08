const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
<<<<<<< HEAD
      required: [true, "Job title is required"],
=======
      required: [true, "Title is required"],
>>>>>>> a69bbeba641c791e8fdb1c8f1465c492039d45dc
      trim: true,
    },
    description: {
      type: String,
<<<<<<< HEAD
      required: [true, "Job description is required"],
=======
      required: [true, "Description is required"],
>>>>>>> a69bbeba641c791e8fdb1c8f1465c492039d45dc
    },
    budget: {
      type: Number,
      required: [true, "Budget is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String,
      enum: ["open", "in-progress", "completed"],
      default: "open",
    },
<<<<<<< HEAD
    hiredFreelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    completedAt: {
      type: Date,
    },
    image: {
      type: String,
      default: "",
    },
=======
>>>>>>> a69bbeba641c791e8fdb1c8f1465c492039d45dc
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Job", jobSchema);
