import dashboard from "./dashboard.route";
import express from "express";
import cors from "cors";

const API = express();
API.use(cors({ origin: true }));
API.use(express.json());

API.use("/dashboard", dashboard);

export default API;
