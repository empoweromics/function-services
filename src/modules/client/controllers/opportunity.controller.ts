import { NextFunction, Request, Response } from "express";

/**
 * getAllOpportunities (Filter / search)
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const getAllOpportunities = async (
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

/**
 * getOpportunityDetails lookups
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const getOpportunityDetails = async (
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

/**
 * addOpportunity submit a new one
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const addOpportunity = async (
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

/**
 * deleteOpportunity soft delete
 * @param req
 * @param res
 * @param next
 * @returns
 */
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
