const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Plumbing", "Electrical", "Tutoring", "Cleaning", "Painting", "Other", "Repairing"],
      default: "Other",
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Service", serviceSchema);
