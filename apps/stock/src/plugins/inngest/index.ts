import { inngest } from "@/services/inngest";
import { updateNotionDataSourceFii } from "@/services/inngest/functions/notion";
import { Elysia } from "elysia";
import { serve } from "inngest/bun";

const handler = serve({
  client: inngest,
  functions: [updateNotionDataSourceFii],
});

const app = new Elysia().all("/inngest", ({ request }) =>
  handler(request)
);

export default app;
