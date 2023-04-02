import mongoose from "mongoose";
import { randomUUID } from "../utils/uuid";
const { Schema } = mongoose;

const ProjectSchema = new Schema(
  {
    _id: {
      require: true,
      type: String,
      default: () => randomUUID("t-")
    },
    type: {
      enum: ["debit", "credit"],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      enum: ["EGP", "USD", "UAE"],
      default: "EGP"
    },
    comments: [String],

    client: {
      type: String,
      ref: "users"
    },
    admin: {
      type: String,
      ref: "users"
    },
    method: String,

    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export const ProjectModel = mongoose.model("project", ProjectSchema);
