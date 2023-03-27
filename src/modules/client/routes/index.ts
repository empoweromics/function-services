import Account from "./account.route";
import Data from "./data.route";
import express from "express";
import cors from "cors";

const CLIENT_API = express();
CLIENT_API.use(cors({ origin: true }));
CLIENT_API.use(express.json());

CLIENT_API.all("/check", (req, res) => res.status(200).send("Running ..."));
CLIENT_API.use("/account", Account);
CLIENT_API.use("/data", Data);

export default CLIENT_API;
