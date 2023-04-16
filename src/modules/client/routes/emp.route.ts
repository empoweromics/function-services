import express from "express";
import {
  createEmp,
  deleteEmp,
  getAllEmps
} from "../controllers/emp.controller";
import { validate } from "../../../middlewares/validate.middleware";
import { empSchemaValidation } from "../../../models/schemas/operation.schema";
import { LogEverything } from "../../../middlewares";

const router = express.Router();

router.get("/", getAllEmps);
router.post("/submit", [validate(empSchemaValidation)], createEmp);
router.delete("/:id", LogEverything, deleteEmp);

export default router;
