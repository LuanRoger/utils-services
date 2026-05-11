import Elysia from "elysia";
import { ENV } from "varlock/env";
import FiagroRoutes from "./modules/fiagro/routes";
import FiisRoutes from "./modules/fiis/routes";

const hostname = ENV.HOST || "0.0.0.0";
const port = ENV.PORT || 8082;

const app = new Elysia();

app.use(FiisRoutes);
app.use(FiagroRoutes);

app.listen({ hostname, port });

console.log(
  `🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`
);
