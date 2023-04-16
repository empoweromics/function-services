import mongoose from "mongoose";
const { Schema } = mongoose;

interface Result {
  project: mongoose.Schema.Types.ObjectId;
  developer: mongoose.Schema.Types.ObjectId;
  unit: mongoose.Schema.Types.ObjectId;
}
export interface empInputs {
  clientname: string;
  clientphone: string;
  category: string;
  area: string;
  type: string;
  sqm: number;
  budget: number;
}
export interface empDocument {
  inputs: empInputs;
  outputs?: {
    result1: Result;
    result2: Result;
    result3: Result;
  };
  active: boolean;
  user?: mongoose.Types.ObjectId;
  views: number;
}

const inputSchema = new Schema(
  {
    clientname: {
      type: String,
      required: true
    },
    clientphone: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    area: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    sqm: {
      type: Number,
      required: true
    },
    budget: {
      type: Number,
      required: true
    }
  },
  { _id: false, versionKey: false }
);

const unitSchema = new Schema({
  category: String,
  type: String,
  finishingType: String,
  spaceBuildUp: Number,
  priceBase: Number,
  paymentYears: Number,
  estDelivery: [Number]
});

const resultSchema = new Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project"
    },
    developer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "developer"
    },
    unit: unitSchema
  },
  { _id: false, versionKey: false }
);

const outputsSchema = new Schema(
  {
    result1: resultSchema,
    result2: resultSchema,
    result3: resultSchema
  },
  { _id: false, versionKey: false }
);

const empSchema = new Schema(
  {
    inputs: {
      type: inputSchema,
      required: true
    },
    outputs: {
      type: outputsSchema,
      required: true,
      default: {} // @TODO::Remove it later
    },
    active: {
      type: Boolean,
      default: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    views: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export const empModel = mongoose.model("emp", empSchema);
