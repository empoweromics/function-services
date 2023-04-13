import express from "express";
import {
  createEmp,
  deleteEmp,
  getAllEmps
} from "../controllers/emp.controller";
import { validate } from "../../../middlewares/validate.middleware";
import { empSchemaValidation } from "../../../models/schemas/operation.schema";

const router = express.Router();

router.get("/", getAllEmps);
router.post("/submit", validate(empSchemaValidation), createEmp);
router.delete("/:id", deleteEmp);

export default router;
