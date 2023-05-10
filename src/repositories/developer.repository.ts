import type {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery
} from "mongoose";

import { DeveloperDocument, DeveloperModel } from "../models/developer.model";

export const developerRepo = {
  findOne: (
    query: FilterQuery<DeveloperDocument>,
    options: QueryOptions<DeveloperDocument> = { lean: true },
    select: ProjectionType<DeveloperDocument> = {}
  ) => DeveloperModel.findOne(query, select, options).exec(),

  findById: (
    id: string,
    options: QueryOptions<DeveloperDocument> = { lean: true },
    select: ProjectionType<DeveloperDocument> = {}
  ) => DeveloperModel.findById(id, select, options).exec(),

  // findOnePopulated: (id: string): Promise<DeveloperDocumentPopulated | null> =>
  //   DeveloperModel.findById(id).populate(
  //     "crop",
  //     "name_en name_ar varieties"
  //   ) as unknown as Promise<DeveloperDocumentPopulated | null>,

  Create: (item: DeveloperDocument | Array<DeveloperDocument>) =>
    DeveloperModel.create(item),

  findByIdAndUpdate: (
    id: string,
    update: UpdateQuery<DeveloperDocument>,
    options: QueryOptions<DeveloperDocument> = { lean: true }
  ) => DeveloperModel.findByIdAndUpdate(id, update, options).exec(),

  findPaginated: (
    query: FilterQuery<DeveloperDocument>,
    limit = 10,
    skip = 0,
    select: ProjectionType<DeveloperDocument> = {}
  ) =>
    DeveloperModel.find(query, select)
      .skip(skip)
      .limit(limit)
      // .populate("userId", "name")
      .sort({ createdAt: -1 })
      .lean()
      .exec(),

  find: (
    query: FilterQuery<DeveloperDocument>,
    limit = 10,
    skip = 0,
    options: QueryOptions<DeveloperDocument> = { lean: true },
    select: ProjectionType<DeveloperDocument> = {}
  ) =>
    DeveloperModel.find(query, select, options)
      .skip(skip)
      .limit(limit)
      // .populate("userId", "name")
      .sort({ createdAt: -1 })
      .exec(),

  deleteOne: (id: string) => DeveloperModel.findByIdAndDelete(id).exec(),

  accept: (id: string) =>
    DeveloperModel.findByIdAndUpdate(
      id,
      { status: "accept" },
      { upsert: true, lean: true, new: true }
    ).exec(),

  reject: (id: string) =>
    DeveloperModel.findByIdAndUpdate(
      id,
      { status: "reject" },
      { upsert: true, lean: true, new: true }
    ).exec(),

  inprogress: (id: string) =>
    DeveloperModel.findByIdAndUpdate(
      id,
      { status: "inprogress" },
      { upsert: true, lean: true, new: true }
    ).exec(),

  filterQuery: (body: {
    name?: string;
    area?: string;
    city?: string;
    country?: string;
    active?: boolean;
  }): FilterQuery<DeveloperDocument> => {
    const filter: FilterQuery<DeveloperDocument> = {};
    if (!body) return filter;
    if (body.name) filter["name"] = { $regex: body.name };

    if (body.area)
      filter["area"] = {
        $regex: body.area
      };
    if (body.city) filter["city"] = { $eq: body.city };
    if (body.country) filter["country"] = { $eq: body.country };
    if (body.active) filter["active"] = { $eq: body.active };
    return filter;
  },

  // generateSaleReport: (from: Date, to: Date) =>
  //   DeveloperModel.aggregate(talabatReport(from, to)),

  // getUsersFarmsCount: (date: Date, status: string | undefined) =>
  //   DeveloperModel.aggregate(UserCountFarmsAgg(date, status)),

  // getUsersCountReport: (startDate: Date, endDate: Date) =>
  //   DeveloperModel.aggregate(UsersFarmsCountAgg(startDate, endDate)),

  count: (query: FilterQuery<DeveloperDocument>) =>
    DeveloperModel.countDocuments(query).exec()
};
