import type { NextFunction, Request, Response } from "express";
import { ErrorMessage } from "../../../config/errors";
import { OpportunityModel } from "../../../models/opportunity.model";
import { HttpStatus } from "../../../config/httpCodes";

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
    const user = res.locals.user._id;
    const page = req.headers.page
      ? parseInt(req.headers.page.toString()) - 1
      : 0;
    let limit = 10;
    const skip = page * limit;
    limit = limit + skip;

    const data = await OpportunityModel.find({ user, active: true })
      .limit(limit)
      .skip(skip);
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
    const { client, project, budget } = req.body;
    if (!client || !project || !budget) {
      return res.status(409).json({ message: ErrorMessage.INVALID_PARAMS });
    }
    const user = res.locals.user._id;
    const posts = new OpportunityModel({
      client,
      project,
      budget,
      user,
      active: true
    });
    const data = await posts.save();
    if (!data)
      return res.status(409).json({ message: ErrorMessage.NO_RESOURCE_FOUND });
    return res.status(201).json({ data });
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
