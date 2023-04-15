import mongoose, { Schema } from "mongoose";

// export interface Provider {
//   name: "google";
//   providerId: "google.com";
//   uid: string;
//   info: {
//     photoURL: string;
//     phoneNumber: string;
//   };
// }

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
    phone: String,
    dateOfbirth: String,
    address: String,
    photoUrl: String,
    fcm: String,
    status: {
      type: String,
      enum: ["active", "pendding", "blocked"],
      default: "pendding"
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
    notifications: notificationsSchema,
    access: [AccessLogsSchema]
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("user", UserSchema);
