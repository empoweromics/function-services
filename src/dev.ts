/**
 * loading files and modules
 */
import "dotenv/config";
import express from "express";
import ADMIN_API from "./modules/admin/routes";
import CLIENT_API from "./modules/client/routes";
import { connectToDatabase } from "./config/db";

connectToDatabase();
const port = process.env.PORT ?? 5000;
/**
 * run services
 */
const app = express();
app.use("/empoweromics-dev/us-central1/client", CLIENT_API);
app.use("/empoweromics-dev/us-central1/admin", ADMIN_API);

process.on("unhandledRejection", error => {
  console.error("unhandledRejection:", error);
});

// error handler for uncaught exceptions
process.on("uncaughtException", error => {
  console.error("uncaughtException:", error);
});

app.listen(port, () =>
  console.log(`http://localhost:${port}/empoweromics-dev/us-central1/client`)
);
