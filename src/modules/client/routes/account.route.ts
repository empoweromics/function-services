import express from "express";
import {
  myAccount,
  topDevelopers,
  updateProfile
} from "../controllers/account.controller";

const router = express.Router();

router.get("/", myAccount);
router.get("/top-developers", topDevelopers);
router.put("/", updateProfile);

export default router;
