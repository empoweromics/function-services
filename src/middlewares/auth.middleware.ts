import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user.model";
import { UnauthorizedError } from "../utils/error";

export const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.headers.email;
    const localId = req.headers.localId;
    if (!email || !localId) {
      throw new UnauthorizedError("ProtectedRoute", res);
    }
    const user = UserModel.findOne({ _id: localId, email });
    if (!user) {
      throw new UnauthorizedError("ProtectedRoute", res);
    }
    next();
  } catch (e) {
    if (e instanceof UnauthorizedError) return;
    next(e);
  }
};
