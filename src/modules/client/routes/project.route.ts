import express from "express";
import {
  advancedTextSearch,
  availableUnits,
  getAllPolygonsGeoJsonShaped,
  projectDetails
} from "../controllers/projects.controller";

const router = express.Router();
router.get("/search", advancedTextSearch);

router.get("/polygons", getAllPolygonsGeoJsonShaped);
router.get("/:id", projectDetails);
router.get("/:id/units", availableUnits);

export default router;
