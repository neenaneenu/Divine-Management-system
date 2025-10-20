import Saved from "../models/saved.model.mjs";

// ✅ Save applications
export const saveApplications = async (req, res) => {
  try {
    const { applications } = req.body;

    if (!applications || !Array.isArray(applications)) {
      return res.status(400).json({ message: "Applications array is required" });
    }

    // ✅ Map & format apps to schema fields
    const formatted = applications.map((app) => ({
      name: app.name,
      applicationNumber: app.applicationNumber,
      dob: app.dob,
      mobile1: app.mobile1,
      vehicleClass: app.vehicleClass,
      testDate: app.testDate || new Date(), // ✅ Added testDate
      groupName: app.groupName || "Default Group",
    }));

    // ✅ Insert multiple
    const savedDocs = await Saved.insertMany(formatted);

    res.status(201).json({
      message: "Applications saved successfully",
      saved: savedDocs,
    });
  } catch (err) {
    console.error("❌ Backend error:", err);
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

// ✅ Get all saved applications
export const getAllApplications = async (req, res) => {
  try {
    const apps = await Saved.find().sort({ createdAt: -1 });
    res.json(apps);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching applications",
      error: error.message,
    });
  }
};
