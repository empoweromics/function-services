import type { NextFunction, Request, Response } from "express";
import { ExpressFunc } from "../../../types";

/**
 * getCategory
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const getCategory: ExpressFunc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.send([
      "residential",
      "medical",
      "retail",
      "administrative",
      "industrial"
    ]);
  } catch (error) {
    next(error);
  }
};

export const getFinishingType: ExpressFunc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.send([
      "deluxe-finishing",
      "fully-finished",
      "core-&-shell",
      "semi-finished",
      "finished-with-acs",
      "land"
    ]);
  } catch (error) {
    next(error);
  }
};

export const getType: ExpressFunc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.send([
      "serviced-apartment",
      "apartment",
      "twin-house",
      "penthouse",
      "townhouse",
      "villa",
      "duplex",
      "center",
      "food-&-beverage",
      "clinic",
      "bank",
      "palace",
      "health-&-fitness",
      "office-space",
      "shop",
      "show-room",
      "supermarket",
      "building",
      "chalet",
      "pharmacy",
      "store",
      "studio",
      "entertainment",
      "s-villa",
      "lab",
      "land",
      "coworking-space",
      "factory",
      "storage",
      "cabin"
    ]);
  } catch (error) {
    next(error);
  }
};
