import express from "express";

import {
  getArea,
  getCategory,
  getFinishingType,
  getType,
  getAcademy
} from "../controllers/master.controller";

const router = express.Router();

router.get("/finishing-type", getFinishingType);
router.get("/type", getType);
router.get("/category", getCategory);
router.get("/area", getArea);
router.get("/academy", getAcademy);

export default router;
