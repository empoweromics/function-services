import * as functions from "firebase-functions";
import ADMIN_API from "./modules/admin/routes";
import CLIENT_API from "./modules/client/routes";
import { connectToDatabase } from "./config/db";

connectToDatabase();
export const admin = functions.https.onRequest(ADMIN_API);
export const client = functions.https.onRequest(CLIENT_API);
