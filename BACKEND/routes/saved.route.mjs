import express from "express";
import {
  saveApplications,
  getAllApplications,
  
} from "../controllers/saved.controller.mjs";

const router = express.Router();

router.post("/save", saveApplications);
router.get("/", getAllApplications);


export default router;
