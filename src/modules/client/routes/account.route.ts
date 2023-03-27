import express from "express";
import { myAccount } from "../controllers/account.controller";
import { protectedRoute } from "../../../middlewares/auth.middleware";

const router = express.Router();

router.use(protectedRoute);
router.get("/", myAccount);

export default router;
