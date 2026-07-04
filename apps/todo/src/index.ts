import bearer from "@elysia/bearer";
import cors from "@elysia/cors";
import openapi from "@elysia/openapi";
import serverTiming from "@elysia/server-timing";
import { Elysia } from "elysia";
import { rateLimit } from "elysia-rate-limit";
import logixlysia from "logixlysia";
import { ENV } from "varlock/env";
import z from "zod";
import { version } from "../package.json";
import todoRoutes from "./modules/todo/routes";

const appName = "@utils/todo";
const port = ENV.PORT || 8081;
const hostname = ENV.HOST || "0.0.0.0";
const mainServerUrl = ENV.MAIN_SERVER_URL;

const app = new Elysia()
  .use(
    logixlysia({
      config: {
        service: appName,
        showStartupMessage: true,
        startupMessageFormat: "simple",
        showContextTree: true,
        contextDepth: 2,
        slowThreshold: 150,
        verySlowThreshold: 500,
        ip: false,
      },
    })
  )
  .use(
    cors({
      allowedHeaders: ["Content-Type", "Authorization"],
      methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS"],
    })
  )
  .use(
    rateLimit({
      duration: ENV.RATE_LIMIT_DURATION,
      max: ENV.RATE_LIMIT_MAX,
    })
  )
  .use(serverTiming())
  .use(
    openapi({
      documentation: {
        info: {
          title: appName,
          version,
          description: "CRUD operations for managing todo items.",
          license: {
            name: "MIT",
          },
        },
        servers: [
          {
            url: "http://localhost:8081",
            description: "Local server",
          },
          {
            url: mainServerUrl,
            description: "Main server",
          },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
            },
          },
        },
        openapi: "3.2.0",
      },
      scalar: {
        theme: "deepSpace",
        showOperationId: true,
        customCss: "",
      },
      mapJsonSchema: {
        zod: z.toJSONSchema,
      },
    })
  )
  .use(bearer())
  .onBeforeHandle(({ status, bearer }) => {
    const apiKey = ENV.API_KEY;

    if (bearer !== apiKey) {
      return status("Unauthorized");
    }
  })
  .use(todoRoutes);

app.listen({ port, hostname });
