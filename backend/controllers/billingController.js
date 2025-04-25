const Billing = require("../models/billing");
const { v4: uuidv4 } = require("uuid");
const { Types, isValidObjectId } = require("mongoose");

// Create Bill
const createBill = async (req, res) => {
  try {
    const billingId = `${Math.floor(100 + Math.random() * 900)}-${Math.floor(10 + Math.random() * 90)}-${Math.floor(100 + Math.random() * 900)}`;

    const newBill = new Billing({
      ...req.body,
      billingId,
      customerId: new Types.ObjectId(req.body.customerId),
      driverId: new Types.ObjectId(req.body.driverId),
      rideId: new Types.ObjectId(req.body.rideId)
    });

    await newBill.save();

    res.status(201).json({
      billingId,
      status: "created",
      message: "Billing record created",
      timestamp: new Date()
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Get Bill By billingId
const getBillById = async (req, res) => {
  try {
    const bill = await Billing.findOne({ billingId: req.params.billingId });
    if (!bill) return res.status(404).json({ message: "Bill not found" });
    res.status(200).json(bill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Bill
const deleteBill = async (req, res) => {
  try {
    const deleted = await Billing.findOneAndDelete({ billingId: req.params.billingId });
    if (!deleted) return res.status(404).json({ message: "Bill not found" });

    res.status(200).json({
      status: "success",
      message: "Bill deleted successfully",
      timestamp: new Date()
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search Bills (with optional filters)
const searchBills = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      minAmount,
      maxAmount,
      q,
      page = 1,
      limit = 10,
    } = req.query;

    const filters = [];

    if (startDate || endDate) {
      const dateRange = {};
      if (startDate) dateRange.$gte = new Date(startDate);
      if (endDate) dateRange.$lte = new Date(endDate);
      filters.push({ createdAt: dateRange });
    }

    if (minAmount || maxAmount) {
      const amountRange = {};
      if (minAmount) amountRange.$gte = parseFloat(minAmount);
      if (maxAmount) amountRange.$lte = parseFloat(maxAmount);
      filters.push({ totalAmount: amountRange });
    }

    if (q) {
      filters.push({
        $or: [
          { billingId: { $regex: q, $options: "i" } },
          { rideId: isValidObjectId(q) ? new Types.ObjectId(q) : null },
        ],
      });
    }

    const query = filters.length ? { $and: filters } : {};

    const totalResults = await Billing.countDocuments(query);
    const bills = await Billing.find(query)
      .skip((page - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .lean();

    res.status(200).json({
      totalResults,
      page: parseInt(page),
      limit: parseInt(limit),
      bills,
    });
  } catch (err) {
    console.error("Search Bills Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Search Bills by Customer ID
const searchBillsByCustomerId = async (req, res) => {
  try {
    const { customerId } = req.params;

    if (!isValidObjectId(customerId)) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    const bills = await Billing.find({ customerId: new Types.ObjectId(customerId) }).lean();

    if (!bills.length) {
      return res.status(404).json({ message: "No bills found for this customer" });
    }

    res.status(200).json({
      customerId,
      totalResults: bills.length,
      bills,
    });
  } catch (err) {
    console.error("Error searching bills by customerId:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Predict Fare
const predictFare = async (req, res) => {
  try {
    const { pickupLocation, dropoffLocation, pickupDatetime } = req.body;

    const baseFare = 5;
    const perMileRate = 2.5;
    const distance = Math.random() * 10 + 2;
    const surgeMultiplier = pickupDatetime?.includes("18:00") ? 1.5 : 1.0;

    const predictedFare = baseFare + perMileRate * distance * surgeMultiplier;

    res.status(200).json({
      predictedFare: +predictedFare.toFixed(2),
      estimatedDistance: +distance.toFixed(2),
      surgeMultiplier,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Exports
module.exports = {
  createBill,
  getBillById,
  deleteBill,
  searchBills,
  searchBillsByCustomerId,
  predictFare,
};
