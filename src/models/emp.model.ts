import mongoose from "mongoose";
const { Schema } = mongoose;

interface Result {
  project: mongoose.Schema.Types.ObjectId;
  developer: mongoose.Schema.Types.ObjectId;
  unit: mongoose.Schema.Types.ObjectId;
}
export interface empDocument extends mongoose.Document {
  inputs: object;
  outputs: {
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

const resultSchema = new Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
      required: true
    },
    developer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
      required: true
    },
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "unit",
      required: true
    }
  },
  { _id: false, versionKey: false }
);

const outputsSchema = new Schema(
  {
    result1: {
      type: resultSchema,
      required: true
    },
    result2: {
      type: resultSchema,
      required: true
    },
    result3: {
      type: resultSchema,
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
      type: outputsSchema,
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

export const empModel = mongoose.model("emp", empSchema);
