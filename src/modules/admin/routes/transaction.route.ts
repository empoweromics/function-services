import express from "express";
import { createTransaction } from "../controllers/transaction.controller";
import { validate } from "../../../middlewares/validate.middleware";
import { transactionsSchemaValidation } from "../schemas/basic.schema";

const router = express.Router();

router.post("/", [validate(transactionsSchemaValidation)], createTransaction);

export default router;
