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
  }
);

export { app as echoRoutes };
