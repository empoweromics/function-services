import { NextFunction, Request, Response } from "express";
import { allPolygonsGeoJsonShaped } from "../../../repositories/polygon.repository";

import { unitRepo } from "../../../repositories/unit.repository";
import { projectRepo } from "../../../repositories/project.repository";

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
    const project = await projectRepo.findProjectDetail(id);
    if (!project) {
      return res.status(204).json({ message: "No content" });
    }
    const developer_projects = await projectRepo.findSimilarDevProjects(
      project.developer
    );

    return res.json({ project, developer_projects });
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
  const projectId = req.params.id;
  try {
    const units = await unitRepo.getPricePerMeterGroupByType(projectId);
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
export const advancedTextSearch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const searchText = String(req.query.text);
    if (searchText) {
      const data = await projectRepo.searchByTextProjects(searchText);
      return res.json(data);
    }
    res.send([]);
  } catch (error) {
    next(error);
  }
};
