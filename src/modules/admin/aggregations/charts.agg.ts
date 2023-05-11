import { PipelineStage } from "mongoose";

export const ReportStatusTimeline = (): Array<PipelineStage> => [
  {
    $project: {
      month: {
        $month: "$createdAt"
      },
      status: 1
    }
  },
  {
    $group: {
      _id: {
        status: "$status",
        month: "$month"
      },
      tf: {
        $sum: 1
      }
    }
  },
  {
    $group: {
      _id: {
        statusArr: "$_id.status"
      },
      arr: {
        $push: {
          x: "$_id.month",
          y: "$tf"
        }
      }
    }
  }
];

export const opportunityStatusPerUser = (
  user: string
): Array<PipelineStage> => [
  {
    $match: { user }
  },
  { $group: { _id: "$status", count: { $sum: 1 } } }
];

export const opportunityStatus = (): Array<PipelineStage> => [
  { $group: { _id: "$status", count: { $sum: 1 } } }
];
