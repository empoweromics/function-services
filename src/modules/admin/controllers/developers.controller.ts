import { NextFunction, Request, Response } from "express";
import { developerRepo } from "../../../repositories/developer.repository";
import { HttpStatus } from "../../../config/httpCodes";
import { ExpressFunc } from "../../../types";
import { ErrorMessage } from "../../../config/errors";
// import mongoose from "mongoose";

export const getAllDevelopers: ExpressFunc = async (req, res, next) => {
  try {
    const page = req.headers.page
      ? parseInt(req.headers.page.toString()) - 1
      : 0;
    const limit = 10;
    const skip = page * limit;
    const data = await developerRepo.findPaginated(
      developerRepo.filterQuery(req.query),
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

export const getOneDeveloper = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await developerRepo.findById(req.params.id);
    if (data) return res.status(HttpStatus.OK).json(data);
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: ErrorMessage.NO_RESOURCE_FOUND });
  } catch (error) {
    next(error);
  }
};

export const createDeveloper = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await developerRepo.Create(req.body);
    if (data) return res.status(HttpStatus.OK).json({ data });
    return res
      .status(HttpStatus.CONFLICT)
      .json({ message: ErrorMessage.NO_RESOURCE_FOUND });
  } catch (err) {
    next(err);
  }
};

export const updateDeveloper = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await developerRepo.findByIdAndUpdate(req.params.id, req.body);
    if (data) return res.status(HttpStatus.OK).json(data);
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: ErrorMessage.NO_RESOURCE_FOUND });
  } catch (err) {
    next(err);
  }
};

export const deleteDeveloper = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return await developerRepo.deleteOne(req.params.id);
  } catch (error) {
    next(error);
  }
};
