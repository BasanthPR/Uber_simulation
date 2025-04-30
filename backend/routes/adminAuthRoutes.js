import express from "express";
import { signup, login } from "../controllers/adminAuthController.js"; 

const router = express.Router();

// Admin-only auth endpoints
router.post("/signup", signup);
router.post("/login", login);

export default router;
