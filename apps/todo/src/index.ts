import { Elysia } from "elysia";
import { ENV } from "varlock/env";
import { TodoModule } from "./modules/todo";

const port = ENV.PORT || 8081;
const hostname = ENV.HOST || "0.0.0.0";

const app = new Elysia()
  .use(TodoModule)
  .get("/", () => "OK")
  .listen({ port, hostname });

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
