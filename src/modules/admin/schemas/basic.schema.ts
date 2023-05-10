import { z } from "zod";
import { validateObjectId } from "../../../utils/zod.utils";

export const developerValidation = z.object({
  body: z.object({
    name: z.string(),
    website: z.string().optional(),
    area: z.string().optional(),
    city: z.number().optional(),
    country: z.string().optional(),
    logo: z.string().optional(),
    rating: z.string().optional(),
    active: z.string().optional(),
    i18n: z.object({}).optional()
  })
});

export const transactionsSchemaValidation = z.object({
  body: z.object({
    user: validateObjectId(),
    type: z.string(),
    amount: z.number(),
    details: z.string()
  })
});
