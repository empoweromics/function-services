import mongoose from "mongoose";
const { Schema } = mongoose;

export interface NotificationDocument {
  user?: mongoose.Types.ObjectId;
  topic?: string;
  message: string;
  open?: boolean;
}

const NotificationSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    topic: {
      type: String,
      enum: ["opportunity", "EMP", "empoweromics"],
      default: "empoweromics"
    },
    message: {
      type: String,
      required: true
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export const NotificationModel = mongoose.model(
  "notification",
  NotificationSchema
);
