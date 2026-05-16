import z from "zod";
import { maxEchoTextLenght } from "../constants";

export const echoQuery = z.object({
  text: z.string().min(1, "Text is required").max(maxEchoTextLenght),
});

export const echoResponse = z.object({
  text: z.string(),
});
