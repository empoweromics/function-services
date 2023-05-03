import express from "express";
import { getLatestNotifications } from "../controllers/notifications.controller";

const router = express.Router();

router.get("/latest", getLatestNotifications);

export default router;
