import { NextFunction, Request, Response } from "express";
import { ProjectModel } from "../../../models/project.model";

// const now = new Date();
// const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

export const All = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await ProjectModel.find();
    return res.json({ data });
  } catch (error) {
    next(error);
  }
};
