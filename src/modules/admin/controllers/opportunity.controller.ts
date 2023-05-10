import { NextFunction, Request, Response } from "express";
import { opportunityRepo } from "../../../repositories/opportunity.repository";
import { HttpStatus } from "../../../config/httpCodes";

export const getAllOpportunitis = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = req.headers.page
      ? parseInt(req.headers.page.toString()) - 1
      : 0;
    const limit = 10;
    const skip = page * limit;
    const data = await opportunityRepo.findPaginated(
      opportunityRepo.filterQuery(req.query),
      limit,
      skip
    );
    if (data)
      return res.status(HttpStatus.OK).json({ data, length: data.length });
    return res.status(HttpStatus.NO_CONTENT).json({});
  } catch (err) {
    next(err);
  }
};

export const getOneOpportunity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json({});
  } catch (error) {
    next(error);
  }
};

export const createOpportunity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json({});
  } catch (error) {
    next(error);
  }
};

export const updateOpportunity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json({});
  } catch (error) {
    next(error);
  }
};

export const deleteOpportunity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json({});
  } catch (error) {
    next(error);
  }
};
