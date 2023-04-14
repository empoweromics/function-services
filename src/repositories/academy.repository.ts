import type { ProjectionType, QueryOptions, _FilterQuery } from "mongoose";
import { AcademyModel, academyDocument } from "../models/academy.model";

export const academyRepo = {
  find: (
    query: _FilterQuery<academyDocument>,
    limit = 10,
    skip = 0,
    options: QueryOptions<academyDocument> = { lean: true },
    select: ProjectionType<academyDocument> = {}
  ) =>
    AcademyModel.find(query, select, options)
      .skip(skip)
      .limit(limit)
      .select("_id title url description  level")
      .sort({ createdAt: -1 })
      .exec(),

  findById: (
    id: string,
    options: QueryOptions = { lean: true },
    select: ProjectionType<academyDocument> = {}
  ) => AcademyModel.findById(id, select, options).exec(),

  deleteOne: (id: string) => AcademyModel.findByIdAndDelete(id).exec(),
  Create: (item: academyDocument | Array<academyDocument>) =>
    AcademyModel.create(item)
};
