import type { ProjectionType, QueryOptions, _FilterQuery } from "mongoose";
import { empDocument, empModel } from "../models/emp.model";

export const empRepo = {
  find: (
    query: _FilterQuery<empDocument>,
    limit = 10,
    skip = 0,
    options: QueryOptions<empDocument> = { lean: true },
    select: ProjectionType<empDocument> = {}
  ) =>
    empModel
      .find(query, select, options)
      .skip(skip)
      .limit(limit)
      .select("_id views inputs.clientname")
      .sort({ createdAt: -1 })
      .exec(),

  findById: (
    id: string,
    options: QueryOptions = { lean: true },
    select: ProjectionType<empDocument> = {}
  ) =>
    empModel
      .findById(id, select, options)
      .populate("outputs", "name i18n area units")
      .exec(),

  deleteOne: (id: string) => empModel.findByIdAndDelete(id).exec(),
  deactiveOne: (id: string) =>
    empModel.findByIdAndUpdate(id, { active: false }).exec(),
  Create: (item: empDocument | Array<empDocument>) => empModel.create(item)
};
