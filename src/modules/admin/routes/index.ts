import Dashboard from "./dashboard.route";
import Account from "./account.route";
import Project from "./projects.route";
import Academy from "./academy.route";
import express from "express";
import cors from "cors";

const ADMIN_API = express();
ADMIN_API.use(cors({ origin: true }));
ADMIN_API.use(express.json());

ADMIN_API.use("/dashboard", Dashboard);
ADMIN_API.use("/account", Account);
ADMIN_API.use("/project", Project);
ADMIN_API.use("/academy", Academy);

export default ADMIN_API;
