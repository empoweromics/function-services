import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../../models/user.model";
import { HttpStatus } from "../../../config/httpCodes";

/**
 * Auth data and profile balance
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let data = await UserModel.findByIdAndUpdate(req.params.id, req.body);
    if (!data) {
      data = await UserModel.create(req.body);
    }
    return res.status(HttpStatus.OK).json({ data: data });
  } catch (error) {
    next(error);
  }
};
