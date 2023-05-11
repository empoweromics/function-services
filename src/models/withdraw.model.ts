import mongoose from "mongoose";
const { Schema } = mongoose;

export interface WithdrawDocument {
  user: mongoose.Types.ObjectId;
  status?: string;
  amount: number;
  method: string;
  details: string;
}

const WithdrawSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    status: {
      type: String,
      enum: ["inreview", "accepted", "rejected"],
      default: "inreview"
    },
    method: {
      type: String,
      enum: ["cash", "bank_account", "vodafone_cash"],
      default: "cash"
    },
    amount: {
      type: Number,
      required: true
    },
    details: String
  },
  { timestamps: true }
);

export const WithdrawModel = mongoose.model("withdraw", WithdrawSchema);
