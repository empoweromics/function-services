import mongoose from "mongoose";
import { randomUUID } from "../utils/uuid";
const { Schema } = mongoose;

const UnitSchema = new Schema(
  {
    _id: {
      require: true,
      type: String,
      default: () => randomUUID("u-")
    },
    category: {
      require: true,
      type: String
    },
    type: {
      require: true,
      type: String
    },
    finishingType: String,
    developer: {
      type: String,
      index: true,
      ref: "developers"
    },
    project: {
      type: String,
      index: true,
      ref: "projects"
    },
    priceBase: {
      type: Number,
      require: true
    },
    spaceBuildUp: Number,
    pricePerMeter: Number,
    paymentYears: Number,
    estDelivery: {
      type: [Number],
      required: false
    },
    active: Boolean
  },
  { timestamps: true }
);
export const UnitModel = mongoose.model("unit", UnitSchema);
