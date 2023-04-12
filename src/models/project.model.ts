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
    name: {
      require: true,
      type: String
    },
    developer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "developer"
    },
    state: String,
    category: String,
    area: String,
    city: String,
    country: String,
    acres: Number,
    rating: Number,
    attachments: [String],
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
