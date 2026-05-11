import * as useCases from "../use-cases";
import { FiiNotFound } from "@/shared/errors";
import Elysia from "elysia";
import { getFiByIdSchema } from "@/shared/schemas";

const app = new Elysia({ prefix: "/fiis" });

app.get("/:id", async ({ status, params }) => {
  const { id: fiiId } = params;

  try {
    const fii = await useCases.getFiiById(fiiId);

    return status("OK", fii);
  } catch (e) {
    if (e instanceof FiiNotFound) {
      return status("Not Found");
    }
  }
}, {
  params: getFiByIdSchema
});

export default app;
