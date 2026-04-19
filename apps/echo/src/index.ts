import { ENV } from "varlock/env";
import { Elysia } from "elysia";
import z from "zod";

const hostname = ENV.HOST || "0.0.0.0";
const port = ENV.PORT || 8080;
const maxEchoTextLenght = ENV.MAX_ECHO_TEXT_LENGH || 500;

const app = new Elysia()
  .get("/", ({ status }) => status(200, "OK"))
  .get(
    "/echo",
    ({ query, status }) => {
      const text = query.text;
      console.log({ endpoint: "/echo", text });

      return status(200, { text });
    },
    {
      query: z.object({
        text: z.string().min(1, "Text is required").max(maxEchoTextLenght),
      }),
    },
  )
  .listen({ hostname, port });

console.log(
  `🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`,
);
