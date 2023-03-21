import { NextFunction, Request, Response } from "express";
import { jwtTokenPayload } from ".";

export interface CustomRequest extends Request {
  limit: number;
  skip: number;
}

export interface ResponseLocals {
  user: jwtTokenPayload;
}

export type ExpressFunc = (
  // eslint-disable-next-line no-unused-vars
  req: Request,
  // eslint-disable-next-line no-unused-vars
  res: Response<Record<string, unknown>, ResponseLocals>,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => unknown;

export type ExpressCustomFunc = (
  // eslint-disable-next-line no-unused-vars
  req: CustomRequest,
  // eslint-disable-next-line no-unused-vars
  res: Response<Record<string, unknown>, ResponseLocals>,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => unknown;
