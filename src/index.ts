import "dotenv/config";
import * as fireFunction from "firebase-functions/v2";
import { connectToDatabase } from "./config/db";
import ADMIN_API from "./modules/admin/routes";
import CLIENT_API from "./modules/client/routes";

connectToDatabase();

export const admin = fireFunction.https.onRequest(
  {
    timeoutSeconds: 560,
    memory: "256MiB"
  },
  ADMIN_API
);

export const client = fireFunction.https.onRequest(
  {
    memory: "256MiB"
  },
  CLIENT_API
);
