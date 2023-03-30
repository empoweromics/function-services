import express from "express";
import {
  availableUnits,
  getAllPolygonsGeoJsonShaped,
  projectDetails
} from "../controllers/projects.controller";

const router = express.Router();

router.get("/polygons", getAllPolygonsGeoJsonShaped);
router.get("/project/:id", projectDetails);
router.get("/project/:id/units", availableUnits);

export default router;
