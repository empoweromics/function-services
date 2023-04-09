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
      units: 1,
      developer: 1,
      developer_name: 1
    }
  )
    .populate("developer")
    .exec();

export const findSimilarDevProjects = (developer: string | undefined) =>
  ProjectModel.find(
    { developer },
    {
      name: 1,
      developer_name: 1,
      logo: 1,
      rating: 1
    }
  ).limit(5);
