import Dashboard from "./dashboard.route";
import Auth from "./auth.route";
import Project from "./projects.route";
import Academy from "./developer.route";
import Devfeloper from "./academy.route";
import Transaction from "./transaction.route";
import Opportunity from "./opportunity.route";
import express from "express";
import cors from "cors";
import { verifyToken } from "../../../middlewares/admin.middleware";

const ADMIN_API = express();
ADMIN_API.use(cors({ origin: true }));
ADMIN_API.use(express.json());

ADMIN_API.use(verifyToken);
ADMIN_API.use("/dashboard", Dashboard);
ADMIN_API.use("/auth", Auth);
ADMIN_API.use("/opportunity", Opportunity);
ADMIN_API.use("/developer", Devfeloper);
ADMIN_API.use("/project", Project);
ADMIN_API.use("/academy", Academy);
ADMIN_API.use("/transaction", Transaction);
ADMIN_API.all("/check", (req, res) =>
  res.status(200).send({
    status: "Running ...",
    copyright: "empoweromics.com",
    version: "1.3.0",
    timestamp: new Date()
  })
);
export default ADMIN_API;
