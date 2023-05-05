import type { NextFunction, Request, Response } from "express";
import { ExpressFunc } from "../../../types";
import { notificationRepo } from "../../../repositories/notification.repository";

/**
 * getLatestNotifications
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const getLatestNotifications: ExpressFunc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user._id;
    const page = req.headers.page
      ? parseInt(req.headers.page.toString()) - 1
      : 0;
    let limit = 5;
    const skip = page * limit;
    limit = limit + skip;

    const data = await notificationRepo.find(
      {
        user
      },
      limit,
      skip
    );
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
