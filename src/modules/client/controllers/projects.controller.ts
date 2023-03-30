import { NextFunction, Request, Response } from "express";
import { allPolygonsGeoJsonShaped } from "../../../repositories/polygon.repository";
import { findProjectDetail } from "../../../repositories/project.repository";
import { getPricePerMeter } from "../../../repositories/unit.repository";

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
  const id = req.params.id;
  try {
    const project = await findProjectDetail(id);
    if (!project) {
      return res.status(204).json({ message: "No content" });
    }
    return res.json(project);
  } catch (error) {
    next(error);
  }
};

/**
 * Get unit List per project
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const availableUnits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const units = await getPricePerMeter(id);
    if (!units) {
      return res.status(204).json({ message: "No content" });
    }
    return res.json(units);
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
