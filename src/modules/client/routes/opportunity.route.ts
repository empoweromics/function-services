import express from "express";
import {
  addOpportunity,
  getAllOpportunities
} from "../controllers/opportunity.controller";
import { validate } from "../../../middlewares/validate.middleware";
import { opportunitySchemaValidation } from "../../../models/schemas/operation.schema";

const router = express.Router();

router.get("/", getAllOpportunities);
router.post(
  "/submit",

  [validate(opportunitySchemaValidation)],
  addOpportunity
);

export default router;
