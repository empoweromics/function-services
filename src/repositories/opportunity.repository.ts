import type { ProjectionType, QueryOptions, FilterQuery } from "mongoose";

import {
  OpportunityDocument,
  OpportunityModel
} from "../models/opportunity.model";

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

  getOpportunitiesPaginated: (
    limit: number,
    skip: number,
    filter: FilterQuery<OpportunityDocument>
  ) => {
    return OpportunityModel.find(filter).limit(limit).skip(skip).lean().exec();
  }
};
