import type { ProjectionType, QueryOptions, _FilterQuery } from "mongoose";
import { empDocument, empInputs, empModel } from "../models/emp.model";
import { ObjectId } from "mongodb";

export const empRepo = {
  find: (
    query: _FilterQuery<empDocument>,
    limit = 10,
    skip = 0,
    options: QueryOptions<empDocument> = { lean: true },
    select: ProjectionType<empDocument> = {}
  ) =>
    empModel
      .find(query, select, options)
      .skip(skip)
      .limit(limit)
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
      .populate("outputs", "name i18n area units")
      .exec(),

  deleteOne: (id: string) => empModel.findByIdAndDelete(id).exec(),
  deactiveOne: (id: string) =>
    empModel.findByIdAndUpdate(id, { active: false }).exec(),
  Create: (item: empDocument | Array<empDocument>) => empModel.create(item),

  generateOutputs: (id: ObjectId, item: empInputs) => {
    console.log(item);
    return empModel
      .findByIdAndUpdate(id, {
        outputs: {
          result1: {
            project: new ObjectId("6435f3198ee697e6819ea871"),
            developer: new ObjectId("6435d5ed91155b33caeab147"),
            unit: new ObjectId("6435f355533d4ae1fe613015")
          },
          result2: {
            project: new ObjectId("6435f3198ee697e6819ea5d4"),
            developer: new ObjectId("6435d5ed91155b33caeab2c7"),
            unit: new ObjectId("6435f355533d4ae1fe61309f")
          },
          result3: {
            project: new ObjectId("6435f355533d4ae1fe613062"),
            developer: new ObjectId("6435d5ed91155b33caeab15c"),
            unit: new ObjectId("6435f355533d4ae1fe613025")
          }
        }
      })
      .exec();
  }
};
