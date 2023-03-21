import { NextFunction, Request, Response } from "express";
import { ProjectModel } from "../../../models/project.model";

// const now = new Date();
// const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

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
