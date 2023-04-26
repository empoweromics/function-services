import express from "express";
import { calculateProjectUnitAvilability } from "../controllers/projects.controller";

const router = express.Router();

router.post("/calculate-avilability", calculateProjectUnitAvilability);

export default router;
