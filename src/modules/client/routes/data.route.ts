import express from "express";
import {
  getAllPolygonsGeoJsonShaped,
  projectDetails
} from "../controllers/projects.controller";

const router = express.Router();

router.get("/polygons", getAllPolygonsGeoJsonShaped);
router.get("/project/:id", projectDetails);

export default router;
