import Account from "./account.route";
import Project from "./project.route";
import Opportunity from "./opportunity.route";
import Master from "./master.route";
import express from "express";
import cors from "cors";
import { loggerMiddleware } from "../../../middlewares";
import { protectedRoute } from "../../../middlewares/auth.middleware";
import { auth } from "../controllers/account.controller";

const CLIENT_API = express();
CLIENT_API.use(cors({ origin: true }));
CLIENT_API.use(express.json());

// Middlewares
CLIENT_API.use(loggerMiddleware);
CLIENT_API.put("/auth/:id", auth);

// Protected Routes
CLIENT_API.use(protectedRoute);
CLIENT_API.all("/check", (req, res) => res.status(200).send("Running ..."));
CLIENT_API.use("/account", Account);
CLIENT_API.use("/project", Project);
CLIENT_API.use("/opportunity", Opportunity);
CLIENT_API.use("/master", Master);

export default CLIENT_API;
