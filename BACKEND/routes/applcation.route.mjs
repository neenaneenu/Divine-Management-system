import express from "express";
import {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
} from "../controllers/application.controller.mjs";

import upload from "../middleware/upload.mjs"; // <-- multer config

const router = express.Router();

// Create application (with file upload)
router.post("/post", upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "signature", maxCount: 1 },
]), createApplication);

// Other routes
router.get("/", getApplications);
router.get("/:id", getApplicationById);
router.put("/:id", updateApplication);
router.delete("/:id", deleteApplication);

export default router;
