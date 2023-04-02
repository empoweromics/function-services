import mongoose from "mongoose";

export interface Admin {
  name: string;
  email: string;
  password: string;
  fcm: string;
  privileges: [string];
}

export interface AdminDocument extends Admin, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    phone: String,
    privileges: [String],
    fcm: String
  },
  { timestamps: true }
);

export const AdminModel = mongoose.model<AdminDocument>("admin", AdminSchema);
