import type { NextFunction, Request, Response } from "express";
import { ExpressFunc } from "../../../types";
import { UnitModel } from "../../../models/unit.model";
import { unitRepo } from "../../../repositories/unit.repository";

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
    const data = await unitRepo.findDistinct("category");
    return res.send(data);
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
    const data = await unitRepo.findDistinct("finishingType");
    return res.send(data);
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
    const data = await unitRepo.findDistinct("type");
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

export const getArea: ExpressFunc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await unitRepo.findDistinct("area");
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
