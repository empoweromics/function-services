import mongoose from "mongoose";
import { UnitModel } from "../models/unit.model";

export const unitRepo = {
  getPricePerMeter: (projectId: string) =>
    UnitModel.find(
      { project: projectId },
      "priceBase pricePerMeter spaceBuildUp type"
    ).sort({
      priceBase: 1
    }),
  deleteOne: (id: string) => UnitModel.findByIdAndDelete(id).exec(),

  findDistinct: (field: string) => UnitModel.find().distinct(field).exec(),

  getPricePerMeterGroupByType: (projectId: string) =>
    UnitModel.aggregate([
      { $match: { project: new mongoose.Types.ObjectId(projectId) } },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 }, // this means that the count will increment by 1
          units: {
            $push: {
              id: "$_id",
              priceBase: "$priceBase",
              spaceBuildUp: "$spaceBuildUp",
              paymentYears: "$paymentYears",
              estDelivery: "$estDelivery"
            }
          }
        }
      }
    ])
};
