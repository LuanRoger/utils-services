import { DEFAULT_NOTION_COLUMN_ID_NAME } from "@/constants";
import { inngest } from "@/services/inngest";
import { createNotionClient } from "@/services/notion";
import { updateDataSourceFiisPageProperties } from "@/modules/notion/use-cases";
import type {
  NotionReducePropertiesOptions,
  UpdateNotionDataSourceFiMessage,
} from "@repo/shared/models";

export const updateNotionDataSourceFii = inngest.createFunction(
  { id: "update-notion-data-source-fii", triggers: [{ event: "notion/fii" }] },
  async ({ event, step, logger }) => {
    const notionSecret = process.env.NOTION_INTEGRATION_SECRET;
    if (!notionSecret) {
      logger.warn("Notion integration secret not available");
      return;
    }

    const notionClient = createNotionClient(notionSecret);
    const { dataSourceId, rowIdColumnName, timeZone, ...dataSourceColumns } =
      event.data as UpdateNotionDataSourceFiMessage;
    const dataSourcePropertiesName =
      Object.keys(dataSourceColumns).length !== 0
        ? dataSourceColumns
        : undefined;
    const reduceOptions: NotionReducePropertiesOptions = { timeZone };

    await step.run("updateDataSourceFiisPageProperties", async () => {
      await updateDataSourceFiisPageProperties(
        notionClient,
        dataSourceId,
        rowIdColumnName ?? DEFAULT_NOTION_COLUMN_ID_NAME,
        dataSourcePropertiesName,
        reduceOptions,
      );
    });
  },
);
