import express from "express";

import {
  Accept,
  Reject,
  getAllOpportunitis,
  getOneOpportunity
} from "../controllers/opportunity.controller";

const router = express.Router();
router.put("/accept/:id", Accept);
router.put("/reject/:id", Reject);
router.get("/", getAllOpportunitis);
router.get("/:id", getOneOpportunity);

export default router;
