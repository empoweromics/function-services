import mongoose from "mongoose";
const { Schema } = mongoose;

export interface Pricing {
  total: number;
  monthly: number;
  downPayment: number;
}

const pricingSchema = new mongoose.Schema<Pricing>(
  {
    total: { type: Number, required: true },
    monthly: { type: Number, required: true },
    downPayment: { type: Number, required: true }
  },
  { _id: false, versionKey: false }
);
const OpportunitySchema = new Schema(
  {
    project: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    pricing: pricingSchema,
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

export const DeveloperModel = mongoose.model("opportunity", OpportunitySchema);
export default DeveloperModel;
