import mongoose from "mongoose";
const { Schema } = mongoose;

const UnitSchema = new Schema(
  {
    code: {
      type: String,
      required: true
    },
    category: String,
    type: String,
    finishingType: String,
    city: String,
    area: String,
    country: String,
    developer: String,
    project: String,
    licence: String,
    priceBase: Number,
    spaceBuildUp: Number,
    pricePerMeter: Number,
    paymentYears: Number,
    estDelivery: Number,
    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export const UnitModel = mongoose.model("units", UnitSchema);
export default UnitModel;
