import type { NextFunction, Request, Response } from "express";
import { ErrorMessage } from "../../../config/errors";
import { OpportunityModel } from "../../../models/opportunity.model";
import { HttpStatus } from "../../../config/httpCodes";

interface FilterType {
  project?: string;
  type?: string;
  finishingType?: string;
}

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
    const data = await OpportunityModel.find(filterSearch(req.query));
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
    const { title, content, topicId, image } = req.body;
    if (!title || !content) {
      return res.status(409).json({ message: ErrorMessage.INVALID_PARAMS });
    }
    const posts = new OpportunityModel({
      title,
      content,
      topicId,
      image,
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

const filterSearch = (body: FilterType) => {
  const filter: Record<string, Record<string, string> | boolean> = {};
  if (body.project) filter["project"] = { $eq: body.project };
  if (body.type) filter["type"] = { $eq: body.type };
  if (body.finishingType) filter["finishingType"] = { $eq: body.finishingType };
  return filter;
};
