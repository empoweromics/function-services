import express from "express";
import {
  advancedTextSearch,
  availableUnits,
  getAllPolygonsGeoJsonShaped,
  projectDetails
} from "../controllers/projects.controller";
import { Log } from "../../../middlewares";

const router = express.Router();
router.get("/search", Log, advancedTextSearch);

router.get("/polygons", getAllPolygonsGeoJsonShaped);
router.get("/:id", projectDetails);
router.get("/:id/units", availableUnits);

export default router;
