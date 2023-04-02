import { NextFunction, Request, Response } from "express";
// import mongoose from "mongoose";

interface FilterType {
  project?: string;
  type?: string;
  finishingType?: string;
}

export const getAllOpportunitis = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(filterSearch({}));
  } catch (error) {
    next(error);
  }
};

export const getOneOpportunity = async (
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

export const createOpportunity = async (
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

export const updateOpportunity = async (
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
