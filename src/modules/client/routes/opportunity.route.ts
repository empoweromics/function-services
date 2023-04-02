import express from "express";
import {
  addOpportunity,
  getAllOpportunities
} from "../controllers/opportunity.controller";

const router = express.Router();

router.get("/", getAllOpportunities);
router.post("/submit", addOpportunity);

export default router;
