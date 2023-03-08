import dashboard from "./dashboard.route";
import express from "express";
import cors from "cors";

const ADMIN_API = express();
ADMIN_API.use(cors({ origin: true }));
ADMIN_API.use(express.json());

ADMIN_API.use("/dashboard", dashboard);

export default ADMIN_API;
