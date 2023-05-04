import type { ProjectionType, QueryOptions, _FilterQuery } from "mongoose";
import { empDocument, empInputs, empModel } from "../models/emp.model";
import { UnitModel } from "../models/unit.model";
import { Types } from "mongoose";

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

  findById: (id: string, options: QueryOptions = { lean: true }) =>
    empModel
      // .findById(id, select, options)
      .findByIdAndUpdate(
        id,
        {
          $inc: { views: 1 }
        },
        options
      )
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

  submitOutputRes1: (id: Types.ObjectId) =>
    empModel.findByIdAndUpdate(id, { "outputs.result1.submited": true }).exec(),
  submitOutputRes2: (id: Types.ObjectId) =>
    empModel.findByIdAndUpdate(id, { "outputs.result2.submited": true }).exec(),
  submitOutputRes3: (id: Types.ObjectId) =>
    empModel.findByIdAndUpdate(id, { "outputs.result3.submited": true }).exec(),
  Create: (item: empDocument | Array<empDocument>) => empModel.create(item),

  previewOutputs: async (inputs: empInputs) => {
    const { category, area, type, sqm, budget } = inputs;

    const filter = {
      ...(sqm
        ? {
            category,
            area,
            type,
            priceBase: {
              $lte: budget
            },
            spaceBuildUp: {
              $lte: sqm
            }
          }
        : {
            category,
            area,
            type,
            priceBase: {
              $lte: budget
            }
          })
    };
    const units = await UnitModel.find(filter)
      .sort({
        pricePerMeter: -1
      })
      .populate("project", "name logo state")
      .populate("developer", "name logo state");

    const uniqueUnits = units.filter(
      (value, index, self) =>
        index === self.findIndex(t => t.project === value.project)
    );
    return uniqueUnits.slice(0, 3);
  },

  generateOutputs: async (id: Types.ObjectId, inputs: empInputs) => {
    const { category, area, type, sqm, budget } = inputs;
    const filter = {
      ...(sqm
        ? {
            category,
            area,
            type,
            priceBase: {
              $lte: budget
            },
            spaceBuildUp: {
              $lte: sqm
            }
          }
        : {
            category,
            area,
            type,
            priceBase: {
              $lte: budget
            }
          })
    };
    const units = await UnitModel.find(filter)
      .sort({
        pricePerMeter: -1
      })
      .populate("project", "name logo state")
      .populate("developer", "name logo state");

    const uniqueUnits = units.filter(
      (value, index, self) =>
        index === self.findIndex(t => t.project === value.project)
    );
    uniqueUnits.slice(0, 3);
    const outputs = {
      res1: uniqueUnits[0], // cheapest sqm / pricePerMeter
      res2: uniqueUnits[1],
      res3: uniqueUnits[2]
    };

    return empModel
      .findByIdAndUpdate(id, {
        outputs: {
          result1: {
            project: outputs.res1?.project,
            developer: outputs.res1?.developer,
            unit: outputs.res1
          },
          result2: {
            project: outputs.res2?.project,
            developer: outputs.res2?.developer,
            unit: outputs.res2
          },
          result3: {
            project: outputs.res2?.project,
            developer: outputs.res2?.developer,
            unit: outputs.res2
          }
        }
      })
      .exec();
  }
};
