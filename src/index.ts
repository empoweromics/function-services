import * as functions from "firebase-functions";
import ADMIN_API from "./modules/admin/routes";
import CLIENT_API from "./modules/client/routes";

export const admin = functions.https.onRequest(ADMIN_API);
export const client = functions
  .runWith({
    // Ensure the function has enough memory and time
    // to process large files
    timeoutSeconds: 300,
    memory: "512MB"
  })
  .https.onRequest(CLIENT_API);
