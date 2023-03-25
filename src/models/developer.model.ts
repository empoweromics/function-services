import mongoose from "mongoose";
const { Schema } = mongoose;

const DeveloperSchema = new Schema(
  {
    _id: {
      require: true,
      type: String
    },
    name: {
      require: true,
      type: String
    },
    website: String,
    area: String,
    city: String,
    country: String,
    logo: String,
    rating: Number,
    active: Boolean,
    i18n: {
      type: Object
    }
  },
  { timestamps: true }
);

export const DeveloperModel = mongoose.model("developer", DeveloperSchema);
export default DeveloperModel;
