import type { ProjectionType, QueryOptions } from "mongoose";

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

  deleteOne: (id: string) => OpportunityModel.findByIdAndDelete(id).exec()
};
