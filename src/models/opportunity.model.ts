import mongoose from "mongoose";
import { randomUUID } from "../utils/uuid";
const { Schema } = mongoose;

const clientSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  directly: Boolean
});

const projectSchema = new Schema({
  id: {
    type: String,
    index: true
  },
  name: String,
  developer: String
});

const unitSchema = new Schema({
  id: {
    type: String,
    index: true
  },
  priceBase: {
    type: Number,
    required: true
  },
  spaceBuildUp: {
    type: Number,
    required: true
  },
  paymentYears: Number
});
const budgetSchema = new Schema({
  downpayment: {
    type: Number,
    required: true
  },
  installmentAmountDue: {
    type: Number,
    required: true
  },
  totalNumberOfInstallments: {
    type: Number,
    required: true
  }
});
const OpportunitySchema = new Schema(
  {
    _id: {
      require: true,
      type: String,
      default: () => randomUUID("o-")
    },
    client: {
      type: clientSchema,
      required: true
    },
    project: {
      type: projectSchema,
      required: true
    },
    unit: {
      type: unitSchema,
      required: true
    },
    budget: {
      type: budgetSchema,
      required: true
    },
    user: {
      type: String,
      index: true,
      required: true
    },
    status: {
      type: String,
      enum: ["pendding", "deal", "closed"],
      default: "pendding"
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
