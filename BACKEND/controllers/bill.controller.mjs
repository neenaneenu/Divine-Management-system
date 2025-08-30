import { billCollection } from "../models/bill.model.mjs";

// ➕ Add Bill
export const addBill = async (req, res) => {
  try {
    const { billDate, billAmount, applicationNumber, name } = req.body;
    const bill = new billCollection({ billDate, billAmount, applicationNumber, name });
    await bill.save();
    res.status(201).json(bill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 📜 Get all bills
export const getBills = async (req, res) => {
  try {
    const bills = await billCollection.find();
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔍 Get bill by ID
export const getBillById = async (req, res) => {
  try {
    const bill = await billCollection.findById(req.params.id).populate("applicationId");
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bill", error });
  }
};

// ✏️ Update bill
export const updateBill = async (req, res) => {
  try {
    const { billAmount } = req.body;
    const bill = await billCollection.findByIdAndUpdate(
      req.params.id,
      { billAmount },
      { new: true }
    );
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: "Error updating bill", error });
  }
};

// ❌ Delete bill
export const deleteBill = async (req, res) => {
  try {
    const bill = await billCollection.findByIdAndDelete(req.params.id);
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.json({ message: "Bill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting bill", error });
  }
};
