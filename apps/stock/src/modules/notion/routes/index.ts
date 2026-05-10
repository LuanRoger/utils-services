import { APP_RESPONSES, DEFAULT_NOTION_COLUMN_ID_NAME } from "@/constants";
import { type NotionReducePropertiesOptions } from "@repo/shared/models";
import { createNotionClient } from "@/services/notion";
import {
  updateDataSourceFiisPageProperties,
  updateDataSourceFiTicketPageProperties,
} from "../use-cases";
import Elysia from "elysia";
import {
  notionDataSourceIdSchema,
  updateDataSourceFiisPropertiesHeadersSchema,
  updateDataSourceFiisPropertiesSchema,
  updateDataSourceFiTicketSchema,
} from "../schemas";

const app = new Elysia({ prefix: "/module/notion" });

app.post(
  ":dataSourceId/:ticket",
  async ({ status, params, headers, body }) => {
    const notionSecret = process.env.NOTION_INTEGRATION_SECRET;
    if (!notionSecret) {
      return status("Internal Server Error", APP_RESPONSES.SECRET_NOT_SET);
    }

    const notionClient = createNotionClient(notionSecret);
    const { dataSourceId, ticket } = params;
    const { rowIdColumnName, dataSourceColumns } = body;
    const { TimeZone: timeZone } = headers;

    const reduceOptions: NotionReducePropertiesOptions = { timeZone };
    await updateDataSourceFiTicketPageProperties(
      notionClient,
      dataSourceId,
      rowIdColumnName ?? DEFAULT_NOTION_COLUMN_ID_NAME,
      ticket,
      dataSourceColumns,
      reduceOptions,
    );

    return status("No Content");
  },
  {
    params: updateDataSourceFiTicketSchema,
    body: updateDataSourceFiisPropertiesSchema,
    headers: updateDataSourceFiisPropertiesHeadersSchema,
  },
);

app.post(
  ":dataSourceId",
  async ({ status, params, body, headers }) => {
    const notionSecret = process.env.NOTION_INTEGRATION_SECRET;
    if (!notionSecret) {
      return status("Internal Server Error", APP_RESPONSES.SECRET_NOT_SET);
    }

    const notionClient = createNotionClient(notionSecret);
    const { dataSourceId } = params;
    const { rowIdColumnName, dataSourceColumns } = body;
    const { TimeZone: timeZone } = headers;

    const reduceOptions: NotionReducePropertiesOptions = { timeZone };
    await updateDataSourceFiisPageProperties(
      notionClient,
      dataSourceId,
      rowIdColumnName ?? DEFAULT_NOTION_COLUMN_ID_NAME,
      dataSourceColumns,
      reduceOptions,
    );

    return status("No Content");
  },
  {
    params: notionDataSourceIdSchema,
    body: updateDataSourceFiisPropertiesSchema,
    headers: updateDataSourceFiisPropertiesHeadersSchema,
  },
);

export default app;
