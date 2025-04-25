const express = require("express");
const {
  authenticateToken,
  authorizeRoles
} = require("../middleware/authMiddleware");
const {
  addDriver,
  addCustomer,
  getUser,
  getRevenueByDay,
  getRidesPerArea,
  getRidesPerDriver,
  getRidesPerCustomer,
  searchBills,
  getBillById
} = require("../controllers/adminController");

const router = express.Router();

// Secure all routes
router.use(authenticateToken);
router.use(authorizeRoles("admin"));

// Admin management
router.post("/drivers", addDriver);
router.post("/customers", addCustomer);
router.get("/users/:userId", getUser);

// Stats
router.get("/stats/revenue", getRevenueByDay);
router.get("/stats/rides-per-area", getRidesPerArea);
router.get("/charts/rides-per-driver", getRidesPerDriver);
router.get("/charts/rides-per-customer", getRidesPerCustomer);

// Billing
router.get("/bills/search", searchBills);
router.get("/bills/:billId", getBillById);

module.exports = router;
