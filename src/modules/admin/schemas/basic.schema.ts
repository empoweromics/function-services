import { z } from "zod";
import { validateObjectId } from "../../../utils/zod.utils";

export const transactionsSchemaValidation = z.object({
  body: z.object({
    user: validateObjectId(),
    type: z.string(),
    amount: z.number(),
    details: z.string()
  })
});
