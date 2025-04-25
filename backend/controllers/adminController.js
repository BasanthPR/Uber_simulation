const User = require("../models/user");
const Ride = require("../models/ride");
const Bill = require("../models/billing");
const { Types } = require("mongoose");

// Add driver
const addDriver = async (req, res) => {
  try {
    const newDriver = new User({ ...req.body, role: "driver" });
    await newDriver.save();
    res.status(201).json({ message: "Driver created", id: newDriver._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add customer
const addCustomer = async (req, res) => {
  try {
    const newCustomer = new User({ ...req.body, role: "customer" });
    await newCustomer.save();
    res.status(201).json({ message: "Customer created", id: newCustomer._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get specific user (driver/customer)
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).lean();
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Revenue per day
const getRevenueByDay = async (req, res) => {
  const { date } = req.query;
  const from = new Date(date);
  const to = new Date(date); to.setDate(from.getDate() + 1);

  const bills = await Bill.find({ createdAt: { $gte: from, $lt: to } });
  const totalRevenue = bills.reduce((acc, bill) => acc + (bill.totalAmount || 0), 0);

  res.json({ date, totalRevenue });
};

// Rides per area
const getRidesPerArea = async (req, res) => {
  const result = await Ride.aggregate([
    { $group: { _id: "$area", totalRides: { $sum: 1 } } },
    { $project: { area: "$_id", totalRides: 1, _id: 0 } }
  ]);
  res.json(result);
};

// Rides per user
const getRidesPerDriver = async (req, res) => {
  const result = await Ride.aggregate([
    { $group: { _id: "$driverId", totalRides: { $sum: 1 } } },
    { $project: { driverId: "$_id", totalRides: 1, _id: 0 } }
  ]);
  res.json(result);
};

const getRidesPerCustomer = async (req, res) => {
  const result = await Ride.aggregate([
    { $group: { _id: "$customerId", totalRides: { $sum: 1 } } },
    { $project: { customerId: "$_id", totalRides: 1, _id: 0 } }
  ]);
  res.json(result);
};

// Search & get bill
const searchBills = async (req, res) => {
  const filters = {};
  if (req.query.customerId && Types.ObjectId.isValid(req.query.customerId)) filters.customerId = req.query.customerId;
  if (req.query.driverId && Types.ObjectId.isValid(req.query.driverId)) filters.driverId = req.query.driverId;
  if (req.query.billingId) filters.billingId = req.query.billingId;

  const bills = await Bill.find(filters);
  res.json({ results: bills.length, bills });
};

const getBillById = async (req, res) => {
  const bill = await Bill.findOne({ billingId: req.params.billId });
  if (!bill) return res.status(404).json({ message: "Not found" });
  res.json(bill);
};

module.exports = {
  addDriver,
  addCustomer,
  getUser,
  getRevenueByDay,
  getRidesPerArea,
  getRidesPerDriver,
  getRidesPerCustomer,
  searchBills,
  getBillById
};
