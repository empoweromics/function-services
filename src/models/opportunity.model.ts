import mongoose from "mongoose";
const { Schema } = mongoose;

const OpportunitySchema = new Schema(
  {
    project: {
      type: String,
      required: true,
      ref: "projects"
    },
    type: {
      type: String,
      required: true
    },
    finishingType: {
      type: String,
      required: true
    },
    user: {
      type: String,
      ref: "user",
      required: true
    },
    pricing: {
      total: Number,
      monthly: Number,
      downPayment: Number
    },
    maxDelivery: {
      type: Number,
      default: 1
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export const OpportunityModel = mongoose.model(
  "opportunity",
  OpportunitySchema
);
