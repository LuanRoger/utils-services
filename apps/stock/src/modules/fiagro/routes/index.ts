import Elysia from "elysia";
import z from "zod";
import { FiiNotFound } from "@/shared/errors";
import { getFiByIdSchema } from "@/shared/schemas";
import { getFiagroByIdResponse } from "../schemas";
import { getFiagroById as getFiagroByIdUseCase } from "../use-cases";

const app = new Elysia({ prefix: "/fiagro" });

app.get(
  "/:id",
  async ({ status, params, set }) => {
    const { id: fiiId } = params;

    try {
      const fii = await getFiagroByIdUseCase(fiiId);
      const parsedResponse = getFiagroByIdResponse.parse(fii);

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
      description: "Get Fiagro by ID",
      operationId: "getFiagroById",
    },
    params: getFiByIdSchema,
    response: {
      200: getFiagroByIdResponse,
      404: z.literal("Not Found"),
      500: z.literal("Internal Server Error"),
    },
  }
);

export default app;
