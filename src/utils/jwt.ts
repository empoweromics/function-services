import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const JWT_SECRET = "sd51g5dss6d2g65g1";
export const JwtSign = (
  data: { _id: string | Types.ObjectId; name: string },
  expiresIn: "1d" | "10d" | "1y" | undefined = undefined
) =>
  jwt.sign({ userId: data._id, name: data.name }, JWT_SECRET, {
    expiresIn: expiresIn ?? "1y"
  });

export interface jwtTokenPayload {
  userId: string;
  role: string;
}

/*
 * Takes JWT and verifys
 * @param {string} token
 */
export function verifyJwt(token: string) {
  const Token = token.split(" ").length > 1 ? token.split(" ")[1] : token;
  try {
    const value = jwt.verify(Token, JWT_SECRET);
    return {
      err: null,
      value: value as jwtTokenPayload
    };
  } catch (err: unknown) {
    return {
      err: err,
      value: null
    };
  }
}
