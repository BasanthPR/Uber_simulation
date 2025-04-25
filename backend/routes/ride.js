const express = require("express");
const router = express.Router();
const Ride = require("../models/ride");

router.post("/", async (req, res) => {
  try {
    const ride = await Ride.create(req.body);
    res.status(201).json(ride);
  } catch (err) {
    res.status(500).json({ error: "Failed to create ride" });
  }
});

module.exports = router;
