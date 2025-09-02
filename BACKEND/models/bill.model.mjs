import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
  billDate: { type: Date, default: Date.now },
  billAmount: { type: Number, required: true },
  billNumber: { type: String, required: true, unique: true }, // Added
  name: { type: String, required: true },
  mobile1: { type: String, required: true },
  mobile2: { type: String },
});

export const billCollection = mongoose.model("bill", billSchema);
