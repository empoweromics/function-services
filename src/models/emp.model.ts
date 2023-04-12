import mongoose from "mongoose";
const { Schema } = mongoose;

const inputSchema = new Schema(
  {
    clientname: {
      type: String,
      require: true
    },
    clientphone: String,
    category: {
      type: String,
      require: true
    },
    area: {
      type: String,
      require: true
    },
    type: String,
    sqm: String,
    budget: {
      type: Number,
      required: true
    }
  },
  { _id: false, versionKey: false }
);

const projectSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
      required: true
    },
    units: {
      type: Array,
      required: true
    }
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
      type: projectSchema,
      required: true
    },
    active: {
      type: Boolean,
      default: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    views: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export const OpportunityModel = mongoose.model("emp", empSchema);
