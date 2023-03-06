import * as functions from "firebase-functions";
import ADMIN_APP from "./routes/index";

export const api = functions.https.onRequest(ADMIN_APP);
