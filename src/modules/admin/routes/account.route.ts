import express from "express";
import { loginByEmail, signup } from "../controllers/account.controller";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", loginByEmail);

export default router;
