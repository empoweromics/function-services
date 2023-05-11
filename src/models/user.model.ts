import mongoose, { Schema } from "mongoose";

const AccessLogsSchema = new Schema({
  browser: String,
  IP: String,
  location: String,
  date: Date
});
const notificationsSchema = new Schema(
  {
    widthdraw: {
      type: Boolean,
      default: true
    },
    weeklyReport: {
      type: Boolean,
      default: true
    },
    // Get a message when a Opportunity fails
    failedOpportunity: {
      type: Boolean,
      default: true
    },
    opportunityStatusUpdate: {
      type: Boolean,
      default: false
    }
  },
  { _id: false, versionKey: false }
);

const UserSchema = new mongoose.Schema(
  {
    firebaseId: {
      require: true,
      type: String
    },
    displayName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
    phone: { type: String, default: "" },
    dateOfbirth: { type: String, default: "" },
    address: { type: String, default: "" },
    photoUrl: String,
    password: String,
    fcm: String,
    status: {
      type: String,
      enum: ["active", "pendding", "blocked"],
      default: "active"
    },
    role: {
      type: String,
      enum: ["admin", "client", "superadmin"],
      default: "client"
    },
    language: {
      type: String,
      enum: ["English", "Arabic"],
      default: "English"
    },
    providerUserInfo: {
      type: Object
    },
    device: {
      type: Object
    },
    emailVerified: Boolean,
    phoneVerified: Boolean,
    notifications: {
      type: notificationsSchema,
      default: {
        widthdraw: true,
        weeklyReport: false,
        failedOpportunity: true,
        opportunityStatusUpdate: true
      }
    },
    access: [AccessLogsSchema]
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("user", UserSchema);
