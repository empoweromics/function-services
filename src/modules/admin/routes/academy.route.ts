import express from "express";
import {
  createLesson,
  deleteLesson,
  getAllLessons,
  getOneLesson,
  updateLesson
} from "../controllers/academy.controller";
import { validate } from "../../../middlewares/validate.middleware";
import { academySchemaValidation } from "../../../models/schemas/operation.schema";

const router = express.Router();

router.get("/", getAllLessons);
router.get("/:id", getOneLesson);
router.post("/", validate(academySchemaValidation), createLesson);
router.put("/:id", validate(academySchemaValidation), updateLesson);
router.delete("/:id", deleteLesson);

export default router;
