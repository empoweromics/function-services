import { NextFunction, Request, Response } from "express";
import { ProjectModel } from "../../../models/project.model";

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
    const data = await ProjectModel.find(
      {
        polygonHasNull: false
      },
      {
        projection: {
          _id: 1,
          type: "Feature",
          geometry: "$geoJSON",
          properties: {
            code: "$code",
            name: "$name",
            supplier: "$supplier",
            state: "$state",
            category: "$category",
            description: "$description",
            area: "$area",
            city: "$city",
            country: "$country",
            acres: "$acres",
            rating: "$rating",
            active: "$active"
          }
        }
      }
    );
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
