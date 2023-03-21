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
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      default: "client",
      enum: ["client", "admin"]
    },
    fcm: {
      type: String
    },
    device: {
      type: Object
    },
    lastlogin: {
      type: Date,
      default: new Date()
    }
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<UserDocument>("user", UserSchema);

export default UserModel;
