import { info } from "firebase-functions/logger";
import mongoose from "mongoose";
/**
 * Connect To DB
 */
mongoose.Promise = global.Promise;
let isConnected = 0;

/**
 * @return {Promise<void>}
 */
export const connectToDatabase = async () => {
  if (isConnected) {
    info("DB: using existing database connection");
    return Promise.resolve();
  }
  mongoose.set("strictQuery", false);
  const db = await mongoose.connect(process.env.MONGO_DB ?? "");
  isConnected = db.connections[0].readyState;
  return db;
};
