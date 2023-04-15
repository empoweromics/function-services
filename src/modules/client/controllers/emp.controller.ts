import type { NextFunction, Request, Response } from "express";
import { ErrorMessage } from "../../../config/errors";
import { HttpStatus } from "../../../config/httpCodes";
import { ExpressFunc } from "../../../types";
import { empRepo } from "../../../repositories/emp.repository";

/**
 * getAllEMPs (Filter / search)
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const getAllEmps: ExpressFunc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user._id;
    const data = await empRepo.find({ user, active: true });
    if (!data)
      return res
        .status(HttpStatus.NO_CONTENT)
        .json({ message: ErrorMessage.NO_CONTENT });

    return res.send({ data, length: data.length });
  } catch (error) {
    next(error);
  }
};

/**
 * getEMPDetails lookups
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const getEmpDetails: ExpressFunc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await empRepo.findById(req.params.id);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * addOpportunity submit a new one
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const createEmp: ExpressFunc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user._id;
    const data = await empRepo.Create({
      inputs: req.body,
      active: true,
      views: 0,
      user
    });

    if (!data)
      return res.status(409).json({ message: ErrorMessage.NO_RESOURCE_FOUND });
    await empRepo.generateOutputs(data._id, data.inputs);
    return res.status(201).json(data.inputs);
  } catch (error) {
    next(error);
  }
};

export const deleteEmp: ExpressFunc = async (req, res, next) => {
  try {
    const data = await empRepo.deactiveOne(req.params.id);
    if (data)
      return res.status(HttpStatus.OK).json({ message: "Resource Deleted" });
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: ErrorMessage.NO_RESOURCE_FOUND });
  } catch (err) {
    next(err);
  }
};
