import Elysia from "elysia";
import z from "zod";
import { FiiNotFound } from "@/shared/errors";
import { getFiByIdSchema } from "@/shared/schemas";
import { getFiiByIdResponse } from "../schemas";
import { getFiiById as getFiiByIdUseCase } from "../use-cases";

const app = new Elysia({ prefix: "/fiis" });

app.get(
  "/:id",
  async ({ status, params, set }) => {
    const { id: fiiId } = params;

    try {
      const fii = await getFiiByIdUseCase(fiiId);
      const parsedResponse = getFiiByIdResponse.parse(fii);

      return status("OK", parsedResponse);
    } catch (error) {
      console.error(error);
      if (error instanceof FiiNotFound) {
        set.status = 404;
        return status("Not Found", "Not Found");
      }

      set.status = 500;
      return status("Internal Server Error", "Internal Server Error");
    }
  },
  {
    detail: {
      description: "Get FII by ID",
      operationId: "getFiiById",
    },
    params: getFiByIdSchema,
    response: {
      200: getFiiByIdResponse,
      404: z.literal("Not Found"),
      500: z.literal("Internal Server Error"),
    },
  }
);

export default app;
