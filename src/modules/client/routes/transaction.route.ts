import express from "express";

import { getLast100Transaction } from "../controllers/transaction.controller";

const router = express.Router();

router.get("/", getLast100Transaction);

export default router;
