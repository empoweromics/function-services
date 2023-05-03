import type { ProjectionType, QueryOptions, _FilterQuery } from "mongoose";
import {
  NotificationDocument,
  NotificationModel
} from "../models/ notification.model";

export const notificationRepo = {
  find: (
    query: _FilterQuery<NotificationDocument>,
    limit = 10,
    skip = 0,
    options: QueryOptions<NotificationDocument> = { lean: true },
    select: ProjectionType<NotificationDocument> = {}
  ) =>
    NotificationModel.find(query, select, options)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec(),

  findById: (
    id: string,
    options: QueryOptions = { lean: true },
    select: ProjectionType<NotificationDocument> = {}
  ) => NotificationModel.findById(id, select, options).exec(),
  Create: (item: NotificationDocument | Array<NotificationDocument>) =>
    NotificationModel.create(item),
  deleteOne: (id: string) => NotificationModel.findByIdAndDelete(id).exec()
};
