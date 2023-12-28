import express from "express";
import { userAuth } from "../middleware/auth.js";
import { createOrder, order, verify } from "../controllers/paymentCotroller.js";
const router = express.Router();
router.post("/order", userAuth, order);
router.post("/createOrder", userAuth, createOrder);
router.post("/verify", userAuth, verify);
export default router;
