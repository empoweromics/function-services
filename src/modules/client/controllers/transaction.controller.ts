import type { NextFunction, Request, Response } from "express";
import { transactionRepo } from "../../../repositories/transactions.repository";
import { ExpressFunc } from "../../../types";
import { ErrorMessage } from "../../../config/errors";

/**
 * getAllOpportunities (Filter / search)
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const getLast100Transaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user._id;
    const data = await transactionRepo.Last100Transaction(user);
    return res.send(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Create Withdraw for new Transaction
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const submitWithdraw: ExpressFunc = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user._id;
    const userBalance = await transactionRepo.getUserBalance(user);
    const amount = Math.abs(req.body.amount);
    if (userBalance >= amount) {
      const data = await transactionRepo.Withdraw({
        amount: req.body.amount,
        method: req.body.method,
        details: req.body.details,
        user
      });
      return res.status(201).json(data);
    }
    return res.status(409).json({ message: ErrorMessage.NO_RESOURCE_FOUND });
  } catch (error) {
    next(error);
  }
};
