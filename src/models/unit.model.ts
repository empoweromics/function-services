import mongoose from "mongoose";
const { Schema } = mongoose;

const UnitSchema = new Schema(
  {
    category: {
      require: true,
      type: String
    },
    type: {
      require: true,
      type: String
    },
    finishingType: String,
    area: {
      type: String,
      index: true
    },
    developer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "developer"
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project"
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
