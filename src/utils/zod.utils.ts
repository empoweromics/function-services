import { z } from "zod";
import { ObjectId, isObjectId } from "./utils";

export function validateObjectId() {
  return z
    .string()
    .refine(val => isObjectId(val))
    .transform(val => ObjectId(val));
}
