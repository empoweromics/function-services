import type { ProjectionType, QueryOptions, _FilterQuery } from "mongoose";
import { empDocument, empInputs, empModel } from "../models/emp.model";
import { ObjectId } from "mongodb";
import { UnitModel } from "../models/unit.model";

export const empRepo = {
  find: (
    query: _FilterQuery<empDocument>,
    options: QueryOptions<empDocument> = { lean: true },
    select: ProjectionType<empDocument> = {}
  ) =>
    empModel
      .find(query, select, options)
      .select("_id views inputs.clientname createdAt")
      .sort({ createdAt: -1 })
      .exec(),

  findById: (
    id: string,
    options: QueryOptions = { lean: true },
    select: ProjectionType<empDocument> = {}
  ) =>
    empModel
      .findById(id, select, options)
      .populate("user", "displayName phone")
      // result1
      .populate("outputs.result1.project", "name logo i18n attachments state")
      .populate("outputs.result1.developer", "name logo i18n attachments state")

      // result2
      .populate("outputs.result2.project", "name logo i18n attachments state")
      .populate("outputs.result2.developer", "name logo i18n attachments state")

      // result3
      .populate("outputs.result3.project", "name logo i18n attachments state")
      .populate("outputs.result3.developer", "name logo i18n attachments state")

      .exec(),

  deleteOne: (id: string) => empModel.findByIdAndDelete(id).exec(),
  deactiveOne: (id: string) =>
    empModel.findByIdAndUpdate(id, { active: false }).exec(),
  Create: (item: empDocument | Array<empDocument>) => empModel.create(item),

  /**
   *
   * @param id
   * @param inputs
   * @returns
   */
  generateOutputs: async (id: ObjectId, inputs: empInputs) => {
    const { category, area, type, sqm, budget } = inputs;
    const budgetRange = {
      min: budget - budget * 0.18,
      max: budget + budget * 0.25
    };
    const sqmRange = {
      min: sqm - sqm * 0.2,
      max: budget + sqm * 0.2
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

    return empModel
      .findByIdAndUpdate(id, {
        outputs: {
          result1: {
            project: outputs.res1.project,
            developer: outputs.res1.developer,
            unit: outputs.res1
          },
          result2: {
            project: outputs.res2.project,
            developer: outputs.res2.developer,
            unit: outputs.res2
          },
          result3: {
            project: outputs.res3.project,
            developer: outputs.res3.developer,
            unit: outputs.res3
          }
        }
      })
      .exec();
  }
};
