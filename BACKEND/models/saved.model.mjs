import mongoose from "mongoose";

const SavedSchema = new mongoose.Schema({
  name: { type: String, required: true },
  applicationNumber: { type: String, required: true },
  dob: { type: Date, required: true },
  mobile1: { type: String, required: true },
  vehicleClass: { type: String, required: true },
  groupName: { type: String, default: "Default Group" }, // optional grouping
});

const saved = mongoose.model("saved", SavedSchema);
export default saved;

