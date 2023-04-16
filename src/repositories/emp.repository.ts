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
      .select("_id views inputs.clientname")
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
   *
   * @param id
   * @param inputs
   * @returns
   */
  generateOutputs: async (id: ObjectId, inputs: empInputs) => {
    const { category, area, type /*sqm, budget*/ } = inputs;
    // const budgetRange = { min: budget - 1000 * 100, max: budget + 1000 * 100 };
    // const sqmRange = {
    //   min: sqm - (sqm * 20) / 100,
    //   max: budget + (sqm * 20) / 100
    // };
    const units = await UnitModel.find({
      category,
      area,
      type
    }).sort({
      priceBase: 1
    });

    const res1 = units[Math.floor(Math.random() * units.length)];
    const res2 = units[Math.floor(Math.random() * units.length)];
    const res3 = units[Math.floor(Math.random() * units.length)];

    return empModel
      .findByIdAndUpdate(id, {
        outputs: {
          result1: {
            project: res1.project,
            developer: res1.developer,
            unit: res1
          },
          result2: {
            project: res2.project,
            developer: res2.developer,
            unit: res2
          },
          result3: {
            project: res3.project,
            developer: res3.developer,
            unit: res3
          }
        }
      })
      .exec();
  }
};
