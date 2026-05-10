import { z } from "zod";
import { fiSchema, numberSchema, stringSchema } from "@/shared/schemas";
import { timeZoneValues } from "@repo/shared/types";

export const textOrNumberSchema = z.union([
  z.object({
    name: stringSchema,
    type: z.literal("text"),
    value: z.string().min(1),
  }),
  z.object({
    name: stringSchema,
    type: z.literal("number"),
    value: numberSchema,
  }),
  z.object({
    name: stringSchema,
    type: z.literal("date"),
    value: z.string().min(1),
  }),
]);

export const updateDataSourceFiisPropertiesSchema = z.object({
  rowIdColumnName: stringSchema.optional(),
  dataSourceColumns: z
    .object({
      actualValue: stringSchema,
      dividendYield: stringSchema,
      lastYieldValue: stringSchema.optional(),
      lastYieldPercentage: stringSchema.optional(),
      lastYieldBasePrice: stringSchema.optional(),
      lastYieldDate: stringSchema.optional(),
      nextYieldValue: stringSchema.optional(),
      nextYieldPercentage: stringSchema.optional(),
      nextYieldBasePrice: stringSchema.optional(),
      nextYieldDate: stringSchema.optional(),
    })
    .optional(),
});

export const notionDataSourceIdSchema = z.object({
  dataSourceId: stringSchema,
});

export const fiTicketSchema = z.object({
  ticket: fiSchema,
});

export const updateDataSourceFiTicketSchema = z.object({
  ...fiTicketSchema.shape,
  ...notionDataSourceIdSchema.shape,
});

export const updateDataSourceFiisPropertiesHeadersSchema = z.object({
  TimeZone: z.enum(timeZoneValues).optional(),
});
