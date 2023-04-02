import { NextFunction, Request, Response } from "express";
import { AdminModel } from "../../../models/admin.model";
import { ErrorMessage } from "../../../config/errors";
import { hashPassword } from "../../../utils/hashing";
// import mongoose from "mongoose";

// const now = new Date();
// const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

export const Counters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json({ count: 1000 });
  } catch (error) {
    next(error);
  }
};
