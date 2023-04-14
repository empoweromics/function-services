import mongoose from "mongoose";

export interface academyDocument {
  title: string;
  description?: string;
  url: string;
  level?: string;
}

const AcademySchema = new mongoose.Schema(
  {
    title: {
      require: true,
      type: String
    },
    description: String,
    url: {
      type: String,
      trim: true
    },
    level: String
  },
  { timestamps: true }
);

export const AcademyModel = mongoose.model("academy", AcademySchema);
