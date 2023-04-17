import { NextFunction, Request, Response } from "express";
import { ProjectModel } from "../../../models/project.model";
import { UnitModel } from "../../../models/unit.model";
// import mongoose from "mongoose";

export const getAllProjects = async (
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

export const getOneProject = async (
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

export const createProject = async (
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

export const updateProject = async (
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

export const deleteProject = async (
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

export const calculateProjectUnitAvilability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const Projects = await ProjectModel.find();
    Projects.forEach(async item => {
      const units = await UnitModel.find(
        { project: item._id },
        "priceBase pricePerMeter spaceBuildUp"
      ).sort({
        priceBase: 1
      });
      if (units) {
        await ProjectModel.updateOne(
          { _id: item._id },
          {
            units: {
              total: units.length,
              start: units[0],
              avg: units[Math.round((units.length - 1) / 2)]
            }
          }
        );
      }
    });
    return res.json({ updated: Projects.length });
  } catch (error) {
    next(error);
  }
};
