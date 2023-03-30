import { ProjectModel } from "../models/project.model";

export const findProjectDetail = (id: string) =>
  ProjectModel.findById(id, {
    state: 1,
    area: 1,
    city: 1,
    i18n: 1,
    logo: 1,
    rating: 1,
    developer: 1
  });
