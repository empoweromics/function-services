import express from "express";
import {
  createDeveloper,
  getAllDevelopers,
  getOneDeveloper,
  updateDeveloper
} from "../controllers/developers.controller";
import { developerSchemaValidation } from "../schemas/basic.schema";
import { validate } from "../../../middlewares/validate.middleware";

const router = express.Router();
router.get("/", getAllDevelopers);
router.post("/", [validate(developerSchemaValidation)], createDeveloper);
router.put("/:id", [validate(developerSchemaValidation)], updateDeveloper);
router.get("/:id", getOneDeveloper);

export default router;
