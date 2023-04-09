import mongoose from "mongoose";
import { randomUUID } from "../utils/uuid";
const { Schema } = mongoose;

const clientSchema = new Schema(
  {
    name: {
      type: String,
      require: true
    },
    phone: {
      type: String,
      require: true
    },
    directly: Boolean
  },
  { _id: false, versionKey: false }
);

const projectSchema = new Schema(
  {
    id: {
      type: String,
      index: true
    },
    name: String,
    developer: String
  },
  { _id: false, versionKey: false }
);

const budgetSchema = new Schema(
  {
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
  },
  { _id: false, versionKey: false }
);
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
