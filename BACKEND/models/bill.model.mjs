import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
  billDate: { type: Date, default: Date.now },
  billAmount: { type: Number, required: true },
  billNumber: { type: String, required: true, unique: true }, // Added
  name: { type: String, required: true }
});

export const billCollection = mongoose.model("bill", billSchema);
