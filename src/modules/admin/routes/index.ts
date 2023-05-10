import Dashboard from "./dashboard.route";
import Account from "./account.route";
import Project from "./projects.route";
import Academy from "./developer.route";
import Devfeloper from "./academy.route";
import Transaction from "./transaction.route";
import express from "express";
import cors from "cors";
import { paginate } from "../../../middlewares/pagination.middleware";
import { ExpressFunc } from "../../../types";

const ADMIN_API = express();
ADMIN_API.use(cors({ origin: true }));
ADMIN_API.use(express.json());
ADMIN_API.use(paginate as ExpressFunc);

ADMIN_API.use("/dashboard", Dashboard);
ADMIN_API.use("/account", Account);
ADMIN_API.use("/developer", Devfeloper);
ADMIN_API.use("/project", Project);
ADMIN_API.use("/academy", Academy);
ADMIN_API.use("/transaction", Transaction);
ADMIN_API.use("/test", (req, res) => res.send("CICD / github action"));

export default ADMIN_API;
