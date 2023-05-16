import express from "express";

import {
  getLast100Transaction,
  submitWithdraw
} from "../controllers/transaction.controller";
import { validate } from "../../../middlewares/validate.middleware";
import { withdrowSchemaValidation } from "../../../models/schemas/operation.schema";

const router = express.Router();

router.get("/", getLast100Transaction);
router.post("/withdraw", [validate(withdrowSchemaValidation)], submitWithdraw);
export default router;
