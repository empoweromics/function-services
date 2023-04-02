import express from "express";
import cors from "cors";
import { loggerMiddleware } from "../../../middlewares";
import { auth } from "../controller/client.controller";

const Auth_API = express();
Auth_API.use(cors({ origin: true }));
Auth_API.use(express.json());

// Middlewares
Auth_API.use(loggerMiddleware);

// Routes
Auth_API.post("/client/:id", auth);

export default Auth_API;
