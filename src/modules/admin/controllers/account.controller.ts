import { NextFunction, Request, Response } from "express";
import { AdminModel } from "../../../models/admin.model";
import { ErrorMessage } from "../../../config/errors";
import { hashPassword, validatePassword } from "../../../utils/hashing";
import { JwtSign } from "../../../utils/jwt";

/**
 * signup admins
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, password, email, phone, fcm } = req.body;
    if (!name || !password || !email) {
      return res.status(409).json({ message: ErrorMessage.INVALID_PARAMS });
    }
    const admin = new AdminModel({ name, email, phone, fcm });
    admin.password = await hashPassword(req.body.password);
    const data = await admin.save();
    return res.json({ id: data._id, name: data.name, email: data.email });
  } catch (error) {
    next(error);
  }
};

/**
 * loginByEmail
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const loginByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, fcm } = req.body;
    const user = await AdminModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: ErrorMessage.INVALID_EMAIL
      });
    }
    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) {
      return res.status(403).json({
        message: ErrorMessage.INVALID_CREDENTIALS
      });
    }
    if (fcm) {
      user.fcm = fcm;
    }
    const accessToken = JwtSign(user);
    await user.save();
    return res.status(200).json({
      data: {
        name: user.name,
        email: user.email,
        privileges: user.privileges
      },
      accessToken
    });
  } catch (error) {
    next(error);
  }
};
