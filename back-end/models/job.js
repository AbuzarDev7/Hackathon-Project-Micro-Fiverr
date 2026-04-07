const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
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
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Job", jobSchema);
