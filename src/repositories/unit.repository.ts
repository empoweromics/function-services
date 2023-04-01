import { UnitModel } from "../models/unit.model";

export const getPricePerMeter = (projectId: string) =>
  UnitModel.find(
    { project: projectId },
    "priceBase pricePerMeter spaceBuildUp type"
  ).sort({
    priceBase: 1
  });

export const getPricePerMeterGroupByType = (projectId: string) =>
  UnitModel.aggregate([
    { $match: { project: projectId } },
    {
      $group: {
        _id: "$type",
        count: { $sum: 1 }, // this means that the count will increment by 1
        units: {
          $push: {
            finishingType: "$finishingType",
            priceBase: "$priceBase",
            spaceBuildUp: "$spaceBuildUp",
            paymentYears: "$paymentYears"
          }
        }
      }
    }
  ]);