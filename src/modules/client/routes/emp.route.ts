import express from "express";
import {
  createEmp,
  deleteEmp,
  getAllEmps
} from "../controllers/emp.controller";

const router = express.Router();

router.get("/", getAllEmps);
router.post("/submit", createEmp);
router.delete("/:id", deleteEmp);

export default router;
