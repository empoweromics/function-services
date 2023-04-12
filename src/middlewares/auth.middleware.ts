import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user.model";
import { UnauthorizedError } from "../utils/error";

export const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.headers.user;
    if (!_id) {
      throw new UnauthorizedError("ProtectedRoute", res);
    }
    const user = await UserModel.findOne({ firebaseId: _id });
    if (!user) {
      throw new UnauthorizedError("ProtectedRoute", res);
    }
    res.locals.user = user;
    return next();
  } catch (e) {
    if (e instanceof UnauthorizedError) return;
    next(e);
  }
};
