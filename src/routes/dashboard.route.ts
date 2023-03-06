import express from "express";
import { Counters } from "../controllers/dashboard.controller";

const router = express.Router();

router.get("/", Counters);

export default router;
