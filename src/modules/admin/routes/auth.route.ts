import express from "express";
import { loginByEmail } from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", loginByEmail);

export default router;
