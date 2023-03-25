import { NextFunction, Request, Response } from "express";

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
    return res.json({ count: 500 });
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
