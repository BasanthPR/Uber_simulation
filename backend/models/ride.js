const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  pickup: String,
  dropoff: String,
  pickupCoords: [Number], // [lng, lat]
  dropoffCoords: [Number],
  time: String,
  rider: String,
  additionalStops: [String],
  status: { type: String, default: "requested" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ride", rideSchema);
