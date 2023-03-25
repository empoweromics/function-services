import mongoose from "mongoose";
const { Schema } = mongoose;

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
    supplier: String,
    developer: {
      type: String,
      ref: "developers"
    },
    state: String,
    category: String,
    area: String,
    city: String,
    country: String,
    acres: Number,
    rating: Number,
    polygonHasNull: Boolean,
    active: {
      type: Boolean,
      default: true
    },
    i18n: {
      type: Object
    },
    geoJSON: {
      type: {
        type: String,
        enum: ["Polygon"],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
  },
  { timestamps: true }
);

export const ProjectModel = mongoose.model("project", ProjectSchema);
