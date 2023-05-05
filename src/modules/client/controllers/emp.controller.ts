import type { NextFunction, Request, Response } from "express";
import { ErrorMessage } from "../../../config/errors";
import { HttpStatus } from "../../../config/httpCodes";
import { ExpressFunc } from "../../../types";
import { empRepo } from "../../../repositories/emp.repository";
import { notificationRepo } from "../../../repositories/notification.repository";
import { DELETE_ACTION, SUCCESS_ACTION } from "../../../config/notifications";

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

export const previewEmp: ExpressFunc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await empRepo.previewOutputs(req.body);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};
/**
 * Create EMP for User to submit a new opportunity
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
      user
    });

    if (!data)
      return res.status(409).json({ message: ErrorMessage.NO_RESOURCE_FOUND });

    empRepo.generateOutputs(data._id, req.body).then(() => {
      notificationRepo.Create({
        user,
        message: SUCCESS_ACTION("EMP Link", String(data._id))
      });
    });
    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteEmp: ExpressFunc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user._id;
    const data = await empRepo.deactiveOne(req.params.id);
    if (data) {
      notificationRepo.Create({
        user,
        message: DELETE_ACTION(`EMP Link ${req.params.id}`)
      });
      return res.status(HttpStatus.OK).json({ message: "Resource Deleted" });
    } else {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: ErrorMessage.NO_RESOURCE_FOUND });
    }
  } catch (err) {
    next(err);
  }
};
