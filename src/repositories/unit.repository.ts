import { UnitModel } from "../models/unit.model";

export const getPricePerMeter = (projectId: string) =>
  UnitModel.find(
    { project: projectId },
    "priceBase pricePerMeter spaceBuildUp"
  ).sort({
    priceBase: 1
  });
