import express from "express";

import {
  getCategory,
  getFinishingType,
  getType
} from "../controllers/master.controller";

const router = express.Router();

router.get("/finishing-type", getFinishingType);
router.get("/type", getType);
router.get("/category", getCategory);

export default router;
