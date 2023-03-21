import { NextFunction, Request, Response } from "express";

export const MyAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json({ count: 200 });
  } catch (error) {
    next(error);
  }
};
