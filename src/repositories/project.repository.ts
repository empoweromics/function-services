import mongoose from "mongoose";
import { ProjectModel } from "../models/project.model";

export const projectRepo = {
  findProjectDetail: (id: string) =>
    ProjectModel.findOne(
      { _id: id },
      {
        state: 1,
        area: 1,
        city: 1,
        i18n: 1,
        logo: 1,
        rating: 1,
        attachments: 1,
        units: 1,
        developer: 1
      }
    ).populate("developer", "name logo"),

  findSimilarDevProjects: (
    developer: mongoose.Schema.Types.ObjectId | undefined
  ) =>
    ProjectModel.find(
      { developer },
      {
        name: 1,
        logo: 1,
        rating: 1
      }
    ).limit(6),

  searchByTextProjects: (searchString: string) =>
    ProjectModel.find(
      {
        $text: { $search: searchString },
        score: { $meta: "textScore" }
      },
      {
        _id: 1,
        name: 1,
        units: 1,
        logo: 1,
        rating: 1
      }
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(8)
};
