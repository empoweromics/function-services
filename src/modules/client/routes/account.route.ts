import express from "express";
import { myAccount, updateProfile } from "../controllers/account.controller";

const router = express.Router();

router.get("/", myAccount);
router.put("/", updateProfile);

export default router;
