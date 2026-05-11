import Elysia from "elysia";
import { FiiNotFound } from "@/shared/errors";
import { getFiByIdSchema } from "@/shared/schemas";
import { getFiagroById as getFiagroByIdUseCase } from "../use-cases";

const app = new Elysia({ prefix: "/fiagro" });

app.get(
  "/:id",
  async ({ status, params }) => {
    const { id: fiiId } = params;

    try {
      const fii = await getFiagroByIdUseCase(fiiId);

      return status("OK", fii);
    } catch (e) {
      if (e instanceof FiiNotFound) {
        return status("Not Found");
      }
    }
  },
  {
    params: getFiByIdSchema,
  }
);

export default app;
