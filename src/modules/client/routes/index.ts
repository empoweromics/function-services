import Account from "./account.route";
import Project from "./project.route";
import Opportunity from "./opportunity.route";
import Master from "./master.route";
import Notifications from "./notifications.route";
import Emp from "./emp.route";
import Public from "./public.route";
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
CLIENT_API.all("/check", (req, res) =>
  res.status(200).send({
    status: "Running ...",
    copyright: "empoweromics.com",
    version: "1.3.0",
    timestamp: new Date()
  })
);
CLIENT_API.use("/account", [protectedRoute], Account);
CLIENT_API.use("/project", [protectedRoute], Project);
CLIENT_API.use("/opportunity", [protectedRoute], Opportunity);
CLIENT_API.use("/master", [protectedRoute], Master);
CLIENT_API.use("/notification", [protectedRoute], Notifications);
CLIENT_API.use("/emp", [protectedRoute], Emp);
CLIENT_API.use("/public", Public);

export default CLIENT_API;
