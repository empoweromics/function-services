import mongoose from "mongoose";
const { Schema } = mongoose;

export interface Developer {
  name: string;
  attachments?: [string];
  website?: string;
  area?: string;
  city?: string;
  country?: string;
  logo?: string;
  rating?: number;
  active?: boolean;
  i18n?: object;
}

export interface DeveloperDocument extends Developer, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

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
