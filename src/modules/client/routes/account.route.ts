import express from "express";
import { auth, myAccount } from "../controllers/account.controller";

const router = express.Router();

router.get("/", myAccount);
router.put("/auth/:id", auth);

export default router;
