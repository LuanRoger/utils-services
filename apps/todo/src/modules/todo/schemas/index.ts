import z from "zod";

export const todoResponseSchema = z.object({
  id: z.number().describe("Unique identifier for the todo item"),
  title: z.string().describe("Title of the todo item"),
  description: z.string().nullable().describe("Description of the todo item"),
  completed: z.boolean().describe("Completion status of the todo item"),
  createdAt: z.iso
    .datetime()
    .describe("Date and time when the todo was created"),
  updatedAt: z.iso
    .datetime()
    .describe("Date and time when the todo was last updated"),
});

export const todoListResponseSchema = z
  .array(todoResponseSchema)
  .describe("Array of todo items");
