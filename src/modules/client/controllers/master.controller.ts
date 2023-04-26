import type { NextFunction, Request, Response } from "express";
import { ExpressFunc } from "../../../types";
import { unitRepo } from "../../../repositories/unit.repository";
import { academyRepo } from "../../../repositories/academy.repository";
import { ErrorMessage } from "../../../config/errors";

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
    const { area } = req.query;
    if (!area) res.status(400).send(ErrorMessage.INVALID_PARAMS);
    const data = await unitRepo.findDistinct("category", { area });
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
    const { category, area } = req.query;
    if (!area || !category) res.status(400).send(ErrorMessage.INVALID_PARAMS);
    const data = await unitRepo.findDistinct("type", { category, area });
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

export const getAcademy: ExpressFunc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = req.query.page ? parseInt(req.query.page.toString()) - 1 : 0;
    let limit = 20;
    const skip = page * limit;
    limit = limit + skip;

    const data = await academyRepo.find({}, limit, skip);
    return res.send(data);
  } catch (error) {
    next(error);
  }
};
