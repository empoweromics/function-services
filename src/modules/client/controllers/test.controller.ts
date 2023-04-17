import type { NextFunction, Request, Response } from "express";
import { ExpressFunc } from "../../../types";
import { UnitModel } from "../../../models/unit.model";

/**
 * getCategory
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const testEMP: ExpressFunc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category, area, type, sqm, budget } = req.body;
    const budgetRange = {
      min: budget - budget * 0.18,
      max: budget + budget * 0.25
    };
    const sqmRange = {
      min: sqm - (sqm * 20) / 100,
      max: budget + (sqm * 20) / 100
    };
    // const q_pricePerMeter = budget / sqm;

    const units = await UnitModel.find({
      category,
      area,
      type
    }).sort({
      pricePerMeter: -1
    });
    const outputs = {
      res1: units[0], // cheapest sqm / pricePerMeter
      res2: units[Math.floor(Math.random() * units.length)],
      res3: units[Math.floor(Math.random() * units.length)]
    };

    for (let index = 1; index < units.length; index++) {
      const unit = units[index];
      if (
        Number(unit.priceBase) >= budgetRange.min &&
        Number(unit.priceBase) <= budgetRange.max
      ) {
        outputs.res2 = unit;
      }
      if (
        Number(unit.spaceBuildUp) >= sqmRange.min &&
        Number(unit.spaceBuildUp) <= sqmRange.max &&
        unit._id !== outputs.res2._id
      ) {
        outputs.res3 = unit;
      }
    }

    return res.send({ outputs, units, length: units.length });
  } catch (error) {
    next(error);
  }
};
