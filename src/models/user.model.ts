import mongoose from "mongoose";

export interface Provider {
  name: "google";
  providerId: "google.com";
  uid: string;
  info: {
    photoURL: string;
    phoneNumber: string;
  };
}
export type RolesType = "ADMIN" | "CLIENT";

export interface User {
  name: string;
  email: string;
  provider: Provider;
  phone: string;
  role: RolesType;
}

export interface UserDocument extends User, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema(
  {
    _id: {
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
    photoUrl: String,
    role: {
      type: String,
      default: "client",
      enum: ["client", "admin"]
    },
    fcm: String,
    lastLoginAt: String,
    providerUserInfo: {
      type: Object
    },
    device: {
      type: Object
    },
    emailVerified: Boolean,
    phoneVerified: Boolean
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<UserDocument>("user", UserSchema);
