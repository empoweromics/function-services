import type { ProjectionType, QueryOptions, FilterQuery } from "mongoose";

import {
  OpportunityDocument,
  OpportunityModel
} from "../models/opportunity.model";
import { opportunityStatusPerUser } from "../modules/admin/aggregations/charts.agg";
import { ObjectId } from "../utils/utils";
import { TransactionModel } from "../models/ transactions.model";

export const opportunityRepo = {
  findById: (
    id: string,
    options: QueryOptions = { lean: true },
    select: ProjectionType<OpportunityDocument> = {}
  ) =>
    OpportunityModel.findById(id, select, options)
      .populate("project", "name i18n area units")
      .exec(),

  deleteOne: (id: string) => OpportunityModel.findByIdAndDelete(id).exec(),
  Create: (item: OpportunityDocument | Array<OpportunityDocument>) =>
    OpportunityModel.create(item),

  count: (query: FilterQuery<OpportunityDocument>) =>
    OpportunityModel.countDocuments(query).exec(),

  findPaginated: (
    query: FilterQuery<OpportunityDocument>,
    limit = 10,
    skip = 0,
    select: ProjectionType<OpportunityDocument> = {}
  ) =>
    OpportunityModel.find(query, select)
      .skip(skip)
      .limit(limit)
      .populate("project", "name logo developer")
      .sort({ createdAt: -1 })
      .lean()
      .exec(),

  reject: (id: string) =>
    OpportunityModel.findByIdAndUpdate(
      id,
      { status: "failure" },
      { upsert: true, lean: true, new: true }
    ).exec(),

  accept: (id: string) =>
    OpportunityModel.findByIdAndUpdate(
      id,
      { status: "success" },
      { upsert: true, lean: true, new: true }
    )
      .exec()
      .then(opportunity =>
        TransactionModel.create({
          user: opportunity.user,
          type: "credit",
          amount: opportunity.budget.downpayment * 0.1,
          details: `Cash ${
            opportunity.budget.downpayment * 0.1
          } EGP charged to your wallet opportunity id : ${opportunity._id}`
        })
      ),

  filterQuery: (body: {
    client?: string;
    project?: string;
    user?: string;
    status?: string;
    active?: boolean;
  }): FilterQuery<OpportunityDocument> => {
    const filter: FilterQuery<OpportunityDocument> = {};
    if (!body) return filter;

    if (body.client) filter["client"] = { $eq: ObjectId(body.client) };
    if (body.project) filter["project"] = { $eq: ObjectId(body.project) };
    if (body.user) filter["user"] = { $eq: ObjectId(body.user) };
    if (body.status) filter["status"] = { $eq: body.status };
    if (body.active) filter["active"] = { $eq: body.active };

    return filter;
  },

  opportunityStatusCount: (userId: string) =>
    OpportunityModel.aggregate(opportunityStatusPerUser(userId)).exec()
};
