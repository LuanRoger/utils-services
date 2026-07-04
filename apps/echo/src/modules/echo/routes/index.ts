import Elysia from "elysia";
import { echoQuery, echoResponse } from "../schemas";

const app = new Elysia({ prefix: "/echo" });

app.get(
  "/",
  ({ query, status }) => {
    const text = query.text;

    return status(200, { text });
  },
  {
    query: echoQuery,
    response: echoResponse,
    detail: {
      summary: "Echo text",
      description: "It will echo the text you provide back to you.",
    },
  }
);

export { app as echoRoutes };
