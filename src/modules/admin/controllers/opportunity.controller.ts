import { NextFunction, Request, Response } from "express";
import { opportunityRepo } from "../../../repositories/opportunity.repository";
import { HttpStatus } from "../../../config/httpCodes";
import { ExpressFunc } from "../../../types";
import { ErrorMessage } from "../../../config/errors";

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

export const Accept: ExpressFunc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await opportunityRepo.accept(req.params.id);
    if (data) return res.status(HttpStatus.OK).json({ data });
    return res
      .status(HttpStatus.CONFLICT)
      .json({ message: ErrorMessage.NO_RESOURCE_FOUND });
  } catch (err) {
    next(err);
  }
};

export const Reject: ExpressFunc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await opportunityRepo.reject(req.params.id);
    if (data) return res.status(HttpStatus.OK).json({ data });
    return res
      .status(HttpStatus.CONFLICT)
      .json({ message: ErrorMessage.NO_RESOURCE_FOUND });
  } catch (err) {
    next(err);
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
