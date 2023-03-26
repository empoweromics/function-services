import { NextFunction, Request, Response } from "express";
import { ErrorMessage } from "../../../config/errors";

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
    const { title, content, topicId, image } = req.body;
    if (!title || !content) {
      return res.status(409).json({ message: ErrorMessage.INVALID_PARAMS });
    }
    const posts = new PostsModel({
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
