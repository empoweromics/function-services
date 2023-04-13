import { ObjectId } from "mongodb";
import { ProjectModel } from "../models/project.model";

export const findProjectDetail = (id: string) =>
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
      developer: 1,
      developer_name: 1
    }
  );

export const findSimilarDevProjects = (developer: ObjectId | undefined) =>
  ProjectModel.find(
    { developer },
    {
      name: 1,
      developer_name: 1,
      logo: 1,
      rating: 1
    }
  ).limit(5);
