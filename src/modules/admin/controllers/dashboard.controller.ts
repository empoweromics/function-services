import { ExpressFunc } from "../../../types";
import { opportunityRepo } from "../../../repositories/opportunity.repository";
import { HttpStatus } from "../../../config/httpCodes";
import { empRepo } from "../../../repositories/emp.repository";
import { OpportunityModel } from "../../../models/opportunity.model";
import {
  ReportStatusTimeline,
  opportunityStatus
} from "../aggregations/charts.agg";

const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

export const Counters: ExpressFunc = async (_req, res, next) => {
  try {
    const [opportunity, opportunityToday, empToday] = await Promise.all([
      opportunityRepo.count({}),
      opportunityRepo.count({
        createdAt: { $gte: today }
      }),
      empRepo.count({
        createdAt: { $gte: today }
      })
    ]);

    return res.status(HttpStatus.OK).json({
      opportunity,
      opportunityToday,
      empToday
    });
  } catch (error) {
    next(error);
  }
};

export const OpportunityByStatus: ExpressFunc = async (req, res, next) => {
  try {
    const data = await OpportunityModel.aggregate(opportunityStatus());
    return res
      .status(HttpStatus.OK)
      .json(data as unknown as Record<string, unknown>);
  } catch (error) {
    next(error);
  }
};

export const OpportunityStatusTimelines: ExpressFunc = async (
  req,
  res,
  next
) => {
  try {
    const data = await OpportunityModel.aggregate(ReportStatusTimeline());
    return res
      .status(HttpStatus.OK)
      .json(data as unknown as Record<string, unknown>);
  } catch (error) {
    next(error);
  }
};
