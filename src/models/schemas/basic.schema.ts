import { z } from "zod";
import { validateObjectId } from "../../utils/zod.utils";

export const developerSchemaValidation = z.object({
  body: z.object({
    name: z.string(),
    website: z.string(),
    attachments: z.array(z.string()),
    agriculturalAssociation: z.string(),
    area: z.string(),
    city: z.string(),
    country: z.string(),
    i18n: z.object({
      ar: z.object({
        name: z.string(),
        description: z.string()
      }),
      en: z.object({
        name: z.string(),
        description: z.string()
      })
    }),
    rating: z.number(),
    active: z.boolean()
  })
});

export const projectSchemaValidation = z.object({
  body: z.object({
    developer: validateObjectId(),
    name: z.string(),
    active: z.boolean(),
    state: z.string(),
    category: z.string(),
    attachments: z.array(z.string()),
    area: z.string(),
    city: z.string(),
    country: z.string(),
    logo: z.string(),
    i18n: z.object({
      ar: z.object({
        name: z.string(),
        description: z.string()
      }),
      en: z.object({
        name: z.string(),
        description: z.string()
      })
    }),
    units: z.object({
      total: z.number(),
      start: z.object({
        _id: validateObjectId(),
        priceBase: z.number(),
        spaceBuildUp: z.number(),
        pricePerMeter: z.number()
      }),
      avg: z.object({
        _id: validateObjectId(),
        priceBase: z.number(),
        spaceBuildUp: z.number(),
        pricePerMeter: z.number()
      })
    })
  })
});
