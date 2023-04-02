import express from "express";
import { myAccount } from "../controllers/account.controller";

const router = express.Router();

router.get("/", myAccount);

export default router;
