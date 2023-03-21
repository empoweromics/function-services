import express from "express";
import { All } from "../controllers/projects.controller";

const router = express.Router();

router.get("/projects", All);

export default router;
