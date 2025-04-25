const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  pickup: { type: String, required: true },
  dropoff: { type: String, required: true },
  pickupCoords: [Number],
  dropoffCoords: [Number],
  time: { type: String }, // can also be Date if you're handling timestamps
  additionalStops: [String],
  status: { type: String, enum: ["requested", "in-progress", "completed", "cancelled"], default: "requested" },

  // These should reference User
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // For stats and grouping
  area: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Ride", rideSchema);