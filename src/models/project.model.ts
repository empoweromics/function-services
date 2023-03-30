import mongoose from "mongoose";
const { Schema } = mongoose;

interface geoJSON {
  type: "Polygon" | "Point";
  coordinates: Array<Array<number>>;
}

const geoJSONSchema = new mongoose.Schema<geoJSON>(
  {
    type: { type: String, required: true },
    coordinates: { type: [[Number]], required: true }
  },
  { _id: false, versionKey: false }
);
const ProjectSchema = new Schema(
  {
    _id: {
      require: true,
      type: String
    },
    name: {
      require: true,
      type: String
    },
    developer_name: String,
    developer: {
      type: String,
      ref: "developer"
    },
    state: String,
    category: String,
    area: String,
    city: String,
    country: String,
    acres: Number,
    rating: Number,
    units: Object,
    polygonHasNull: Boolean,
    active: {
      type: Boolean,
      default: true
    },
    i18n: {
      type: Object
    },
    geoJSON: geoJSONSchema
  },
  { timestamps: true }
);

export const ProjectModel = mongoose.model("project", ProjectSchema);
