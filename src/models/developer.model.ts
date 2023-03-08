import mongoose from "mongoose";
const { Schema } = mongoose;

const DeveloperSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    website: String,
    area: String,
    city: String,
    country: String,
    description: String,
    logo: String,
    rating: Number,
    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export const DeveloperModel = mongoose.model("developers", DeveloperSchema);
export default DeveloperModel;
