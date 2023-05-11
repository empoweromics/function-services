import { NextFunction, Request, Response } from "express";

import { ErrorCode, ErrorMessage } from "../../../config/errors";
import { UserModel } from "../../../models/user.model";
import { JwtSign } from "../../../services/jwt.service";

export const loginByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email, role: "admin" });
    if (!user)
      return res.status(403).json({
        error: ErrorCode.INVALID_EMAIL,
        message: ErrorMessage.INVALID_EMAIL
      });
    const accessToken = JwtSign(user, "1d");
    await user.save();
    return res.status(200).json({
      data: {
        email: user.email,
        phone: user.phone,
        role: user.role
      },
      accessToken
    });
  } catch (error) {
    next(error);
  }
};
