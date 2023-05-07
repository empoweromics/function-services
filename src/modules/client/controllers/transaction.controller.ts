import type { NextFunction, Request, Response } from "express";
import { transactionRepo } from "../../../repositories/transactions.repository";

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
