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
    console.log("DB: using existing database connection");
    return Promise.resolve();
  }
  const db = await mongoose.connect(process.env.MONGO_DB ?? "");
  isConnected = db.connections[0].readyState;
  return db;
};
