import z from "zod";

export const serialIdSchema = z.object({
  id: z.coerce.number(),
});

export type SerialIdSchema = z.infer<typeof serialIdSchema>;
