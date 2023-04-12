import type { ProjectionType, QueryOptions } from "mongoose";
import { empDocument, empModel } from "../models/emp.model";

export const empRepo = {
  findById: (
    id: string,
    options: QueryOptions = { lean: true },
    select: ProjectionType<empDocument> = {}
  ) =>
    empModel
      .findById(id, select, options)
      .populate("project", "name i18n area units")
      .exec(),

  deleteOne: (id: string) => empModel.findByIdAndDelete(id).exec()
};
