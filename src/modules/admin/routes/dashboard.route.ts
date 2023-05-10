import express from "express";
import {
  Counters,
  OpportunityByStatus
} from "../controllers/dashboard.controller";

const router = express.Router();

router.get("/", Counters);
router.get("/opportunity-status", OpportunityByStatus);

export default router;
