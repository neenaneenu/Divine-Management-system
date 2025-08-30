import express from "express";
import {
  addBill,
  getBills,
  updateBill,
  deleteBill
} from "../controllers/bill.controller.mjs";

const router = express.Router();

// ➕ Add a new bill
router.post("/", addBill);

// 📄 Get all bills
router.get("/", getBills);

// ✏ Update bill
router.put("/:id", updateBill);

// ❌ Delete bill
router.delete("/:id", deleteBill);

export default router;
