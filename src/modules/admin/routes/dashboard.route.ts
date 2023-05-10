import express from "express";
import {
  Counters,
  OpportunityByStatus,
  OpportunityStatusTimelines
} from "../controllers/dashboard.controller";

const router = express.Router();

router.get("/", Counters);
router.get("/opportunitybystatus", OpportunityByStatus);
router.get("/opportunitystatustimelines", OpportunityStatusTimelines);

export default router;
