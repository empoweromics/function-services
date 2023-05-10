import { verifyJwt } from "../services/jwt.service";
import { ExpressFunc } from "../types";
import { UnauthorizedError } from "../utils/error";

export const verifyToken: ExpressFunc = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new UnauthorizedError("Expired Jwt Token", res);
    }

    const accessToken: string = req.headers.authorization.replace(
      /^Bearer\s/, // Removes Bearer from token
      ""
    );

    const { err, value } = verifyJwt(accessToken);

    if (value) {
      res.locals.user = value;
      return next();
    }

    if (err) {
      throw new UnauthorizedError("Expired Jwt Token", res);
    }

    return next();
  } catch (e) {
    if (e instanceof UnauthorizedError) return;
    next(e);
  }
};
