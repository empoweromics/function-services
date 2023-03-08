import mongoose from "mongoose";
const { Schema } = mongoose;

const ProjectSchema = new Schema(
  {
    code: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    supplier: String,
    state: String,
    category: String,
    description: String,
    area: String,
    city: String,
    country: String,
    acres: Number,
    rating: Number,
    active: {
      type: Boolean,
      default: true
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

export const ProjectModel = mongoose.model("projects", ProjectSchema);
export default ProjectModel;
