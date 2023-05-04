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
    const outputs = [];
    const units = await UnitModel.find({
      category,
      area,
      type,
      priceBase: {
        $lte: budget.max,
        $gte: budget.min
      }
    })
      .sort({
        pricePerMeter: -1
      })
      .populate("project", "name logo state")
      .populate("developer", "name logo state");

    if (sqm)
      // const uniqueUnits = units.filter(
      //   (value, index, self) =>
      //     index === self.findIndex(t => t.project === value.project)
      // );
      return units;
    const uniqueUnits = units;
    if (uniqueUnits.length > 2) {
      outputs.push(uniqueUnits[0]);
      outputs.push(uniqueUnits[1]);
      outputs.push(uniqueUnits[2]);
    } else if (uniqueUnits.length === 2) {
      outputs.push(uniqueUnits[0]);
      outputs.push(uniqueUnits[1]);
      // scale to get 3rd result
    } else if (uniqueUnits.length === 1) {
      // scale to get 2nd, 3rd result
      outputs.push(uniqueUnits[0]);
    } else {
      // scale to get 2nd, 3rd result
    }
    return outputs;
  },

  generateOutputs: async (id: Types.ObjectId, inputs: empInputs) => {
    const { category, area, type, budget } = inputs;
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
        Number(unit.priceBase) >= budget.min &&
        Number(unit.priceBase) <= budget.max
      ) {
        outputs.res2 = unit;
      }
      if (unit._id !== outputs.res2._id) {
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
