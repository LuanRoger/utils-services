import { getFiById as getFiiByIdStatusInvest } from "@/use-casses/status-invest/fiis";
import { FiNotFound } from "@/models/errors";
import Elysia from "elysia";
import { getFiByIdSchema } from "@/shared/schemas";

const app = new Elysia({ prefix: "/fiis" });

app.get("/:id", async ({ status, params }) => {
  const { id: fiiId } = params;

  try {
    const fii = await getFiiByIdStatusInvest(fiiId);

    return status("OK", fii);
  } catch (e) {
    if (e instanceof FiNotFound) {
      return status("Not Found");
    }
  }
}, {
  params: getFiByIdSchema
});

export default app;
