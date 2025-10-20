import express from "express";
import {
  saveApplications,
  getAllApplications,
  
} from "../controllers/saved.controller.mjs";

const router = express.Router();

router.post("/", saveApplications);
router.get("/getSave", getAllApplications);


export default router;
