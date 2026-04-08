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
<<<<<<< HEAD
      required: [true, "Service description is required"],
=======
      required: [true, "Description is required"],
>>>>>>> a69bbeba641c791e8fdb1c8f1465c492039d45dc
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    category: {
      type: String,
<<<<<<< HEAD
      required: [true, "Category is required"], // e.g., plumbing, tutoring, etc.
    },
    provider: {
=======
      required: [true, "Category is required"],
      enum: ["Plumbing", "Electrical", "Tutoring", "Cleaning", "Painting", "Other", "Repairing"],
      default: "Other",
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    providerId: {
>>>>>>> a69bbeba641c791e8fdb1c8f1465c492039d45dc
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
<<<<<<< HEAD
      default: "", // For future Cloudinary integration
=======
      default: "",
    },
    rating: {
      type: Number,
      default: 5,
>>>>>>> a69bbeba641c791e8fdb1c8f1465c492039d45dc
    },
  },
  {
    timestamps: true,
<<<<<<< HEAD
  },
=======
  }
>>>>>>> a69bbeba641c791e8fdb1c8f1465c492039d45dc
);

module.exports = mongoose.model("Service", serviceSchema);
