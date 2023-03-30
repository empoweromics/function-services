import { NextFunction, Request, Response } from "express";
import { allPolygonsGeoJsonShaped } from "../../../repositories/polygon.repository";
import { ProjectModel } from "../../../models/project.model";
import { UnitModel } from "../../../models/unit.model";

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
    const project = await ProjectModel.findById(id, {
      state: 1,
      area: 1,
      city: 1,
      i18n: 1,
      logo: 1,
      rating: 1,
      developer: 1
    });
    if (!project) {
      return res.status(204).json({ message: "No content" });
    }

    const units = await UnitModel.find(
      { project: id },
      "priceBase pricePerMeter spaceBuildUp"
    ).sort({
      priceBase: 1
    });

    return res.json({
      project,
      units: {
        totla: units.length,
        start: units[0],
        avg: units[Math.round((units.length - 1) / 2)]
      }
    });
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
