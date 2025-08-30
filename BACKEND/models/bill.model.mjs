import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
  billDate: { type: Date, default: Date.now },
  billAmount: { type: Number, required: true },
  applicationNumber: { type: String, required: true },
  name: { type: String, required: true }
});

export const billCollection = mongoose.model("bill", billSchema);
