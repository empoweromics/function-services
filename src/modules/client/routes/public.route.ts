import express from "express";
import { getEmpDetails } from "../controllers/emp.controller";

const router = express.Router();

router.get("/emp/:id", getEmpDetails);

export default router;
