import { NextFunction, Request, Response } from "express";
import { allPolygonsGeoJsonShaped } from "../../../repositories/polygon.repository";

// const now = new Date();
// const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

/**
 * function to retrive all project's Polygons
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const getAllPolygonsGeoJsonShaped = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await allPolygonsGeoJsonShaped();
    return res.json({
      type: "FeatureCollection",
      features: data
    });
  } catch (error) {
    next(error);
  }
};

/**
 * function to get all Details regrding (pricing , ranking .. etc)
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const projectDetails = async (
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
 * advancedSearch to retrive most relevent project in advanced search
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const advancedSearch = async (
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
