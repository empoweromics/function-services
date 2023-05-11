import { PipelineStage } from "mongoose";

export const getUserBalanceAggregation = (
  user: string
): Array<PipelineStage> => [
  {
    $match: {
      user
    }
  },
  {
    $group: {
      _id: "$user",
      balance: {
        $sum: {
          $cond: [
            {
              $eq: ["$type", "credit"]
            },
            "$amount",
            {
              $subtract: [0, "$amount"]
            }
          ]
        }
      }
    }
  }
];
