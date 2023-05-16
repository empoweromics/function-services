import { z } from "zod";
import { validateObjectId } from "../../utils/zod.utils";

export const opportunitySchemaValidation = z.object({
  body: z.object({
    client: z.object({
      name: z.string({ required_error: "Client name is required" }),
      phone: z.string(),
      directly: z.boolean()
    }),
    budget: z.object({
      downpayment: z.number(),
      installmentAmountDue: z.number(),
      totalNumberOfInstallments: z.number()
    }),
    project: z.object({
      _id: validateObjectId(),
      name: z.string(),
      developer: z.string()
    })
  })
});

export const empSchemaValidation = z.object({
  body: z.object({
    clientname: z.string(),
    clientphone: z.string(),
    category: z.string(),
    area: z.string(),
    city: z.string().optional(),
    type: z.string(),
    budget: z.number(),
    sqm: z.number().optional()
  })
});

export const withdrowSchemaValidation = z.object({
  body: z.object({
    amount: z.number({ required_error: "amount value is required" }),
    method: z.string()
  })
});

export const academySchemaValidation = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url(),
    level: z.string()
  })
});
