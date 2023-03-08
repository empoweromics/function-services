import dashboard from "./account.route";
import express from "express";
import cors from "cors";

const CLIENT_API = express();
CLIENT_API.use(cors({ origin: true }));
CLIENT_API.use(express.json());

CLIENT_API.use("/account", dashboard);

export default CLIENT_API;
