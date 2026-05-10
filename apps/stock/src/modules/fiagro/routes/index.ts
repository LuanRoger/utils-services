import { FiNotFound } from "@/models/errors";
import { getFiByIdSchema } from "@/shared/schemas";
import { getFiagroById } from "@/use-casses/status-invest/fiagro";
import Elysia from "elysia";

const app = new Elysia({ prefix: "/fiagro" })

app.get("/:id", async ({ status, params }) => {
  const { id: fiiId } = params;

  try {
    const fii = await getFiagroById(fiiId);

    return status("OK", fii);
  } catch (e) {
    if (e instanceof FiNotFound) {
      return status("Not Found");
    }
  }
},
  {
  params: getFiByIdSchema
});

export default app;
