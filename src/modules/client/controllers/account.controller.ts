import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../../models/user.model";
import { HttpStatus } from "../../../config/httpCodes";
import OpportunityModel from "../../../models/opportunity.model";
import { AcademyModel } from "../../../models/academy.model";

/**
 * Auth data and profile balance
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let data = await UserModel.findOneAndUpdate(
      { firebaseId: req.params.id },
      req.body
    );
    if (!data) {
      data = await UserModel.create(req.body);
    }
    return res.status(HttpStatus.OK).json({ data: data });
  } catch (error) {
    next(error);
  }
};

/**
 * MyAccount data and profile balance
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const myAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user._id;
    const academyCount = await AcademyModel.count();
    const opportunity = await OpportunityModel.aggregate([
      {
        $match: { user }
      },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    return res.json({
      opportunity,
      academy: { total: academyCount, level: "A1" }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * myTransacrions get (Filter / search for all user Transacrions)
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const myTransacrions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json({ count: 500 });
  } catch (error) {
    next(error);
  }
};

/**
 * updateProfile function to get user information and update his profile
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json({ count: 500 });
  } catch (error) {
    next(error);
  }
};
