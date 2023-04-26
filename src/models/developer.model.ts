import mongoose from "mongoose";
const { Schema } = mongoose;

const DeveloperSchema = new Schema(
  {
    name: {
      require: true,
      type: String
    },
    attachments: [String],
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
