import mongoose from "mongoose";
import { notificationRepo } from "../repositories/notification.repository";
import { SUCCESS_ACTION } from "../config/notifications";
const { Schema } = mongoose;

export interface OpportunityDocument extends mongoose.Document {
  client: object;
  project: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  budget: object;
  status?: string;
  notes: string;
  active: boolean;
}

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
    client: {
      type: clientSchema,
      required: true
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
      required: true
    },
    budget: {
      type: budgetSchema,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    status: {
      type: String,
      enum: ["pendding", "success", "failure"],
      default: "pendding"
    },
    notes: String,
    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

OpportunitySchema.post("save", function (doc) {
  notificationRepo.Create({
    user: doc.user,
    message: SUCCESS_ACTION("Opportunity")
  });
});

export const OpportunityModel = mongoose.model(
  "opportunity",
  OpportunitySchema
);
