import mongoose from "mongoose";
const { Schema } = mongoose;

const UnitSchema = new Schema(
  {
    _id: {
      require: true,
      type: String
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
      ref: "developers"
    },
    project: {
      type: String,
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
export default UnitModel;
