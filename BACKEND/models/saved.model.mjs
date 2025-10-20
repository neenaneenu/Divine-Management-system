import mongoose from "mongoose";

const SavedSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    applicationNumber: { type: String, required: true },
    dob: { type: Date, required: true },
    mobile1: { type: String, required: true },
    vehicleClass: { type: String, required: true },
    testDate: { type: Date, required: true }, // ✅ Added testDate field
    groupName: { type: String, default: "Default Group" },
  },
  { timestamps: true }
);

const Saved = mongoose.model("Saved", SavedSchema);
export default Saved;
