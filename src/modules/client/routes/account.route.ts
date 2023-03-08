import express from "express";
import { MyAccount } from "../controllers/account.controller";

const router = express.Router();

router.get("/", MyAccount);

export default router;
