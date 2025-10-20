import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  applicationNumber: { type: String,  },
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  dob: { type: Date, required: true },
  mobile1: { type: String, required: true },
  mobile2: { type: String },
  address: { type: String, required: true },
  pin: { type: String, required: true },
  vehicleClass: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  photo: { type: String },      // file path / URL
  signature: { type: String },  // file path / URL
  billNumber: { type: String },
  documents: [{ type: String }], // ✅ array of file names
  amount: { type: Number },
  date: { type: Date, default: Date.now },
  testDate: {type: Date , default: Date.now},
  leanersDate: {type: Date, default: Date.now},
  SlNo: {type:Number},
   

});


const Application = mongoose.model("Application", applicationSchema);

export default Application;
