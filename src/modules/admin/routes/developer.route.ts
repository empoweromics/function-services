import express from "express";
import { getAllDevelopers } from "../controllers/developers.controller";

const router = express.Router();

router.get("/", getAllDevelopers);

export default router;
