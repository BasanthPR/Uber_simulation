import express from "express";
import {
  createBill,
  getBillById,
  deleteBill,
  searchBills,
  predictFare
} from "../controllers/billingController.js";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/search", authenticateToken, searchBills);
router.post("/create", authenticateToken, authorizeRoles("admin", "driver", "customer"), createBill);
router.get("/:billingId", authenticateToken, getBillById);
router.delete("/:billingId", authenticateToken, authorizeRoles("admin", "customer"), deleteBill);
//router.get("/search-by-customer/:customerId", authenticateToken, authorizeRoles("admin"), searchBillsByCustomerId); 

// router.get("/search", authenticateToken, authorizeRoles("admin", "driver", "customer"), searchBills);

router.post("/predict-fare", authenticateToken, predictFare);

export default router;
