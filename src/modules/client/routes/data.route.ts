import express from "express";
import { getAllPolygonsGeoJsonShaped } from "../controllers/projects.controller";

const router = express.Router();

router.get("/polygons", getAllPolygonsGeoJsonShaped);

export default router;
