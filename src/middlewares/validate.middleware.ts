import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user.model";
import { UnauthorizedError } from "../utils/error";
import { AnyZodObject } from "zod";

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };

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
