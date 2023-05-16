import mongoose from "mongoose";
const { Schema } = mongoose;

export interface TransactionDocument {
  user: mongoose.Types.ObjectId;
  type?: string;
  amount: number;
  details?: string;
}

const TransactionSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    type: {
      type: String,
      enum: ["debit", "credit"],
      default: "credit"
    },
    amount: {
      type: Number,
      required: true
    },
    details: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const TransactionModel = mongoose.model(
  "transaction",
  TransactionSchema
);
