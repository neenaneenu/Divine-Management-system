import saved from "../models/saved.model.mjs";

// ✅ Save applications (can be a single or multiple)
import Saved from "../models/saved.model.mjs"; // your Mongoose model

export const saveApplications = async (req, res) => {
  try {
    const { applications } = req.body;
    if (!applications || !Array.isArray(applications))
      return res.status(400).json({ message: "Applications array is required" });

    const saved = await Saved.create({ applications }); // or map each app if needed
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Backend error:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};


// ✅ Get all applications
export const getAllApplications = async (req, res) => {
  try {
    const apps = await saved.find().sort({ createdAt: -1 });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error: error.message });
  }
};

