import { type PropertiesOptions } from "@/models/properties-options";
import { Client } from "@notionhq/client";
import { updatePageProperty } from "./page";
import { createFilterByRowId, isValidPage } from "@/utils/notion";
import { lower } from "@/utils/string";
import { type NotionReducePropertiesOptions } from "@repo/shared/models";

export async function getDataSourceRowIds(
  client: Client,
  dataSourceId: string,
  rowIdColumnName: string
) {
  const dataSource = await client.dataSources.query({
    data_source_id: dataSourceId,
  });

  const rowIds: string[] = [];
  for (const page of dataSource.results) {
    const isValid = isValidPage(page, rowIdColumnName);
    if (!isValid) {
      continue;
    }

    const rowIdProperty = page.properties[rowIdColumnName];
    if (rowIdProperty?.type !== "title") {
      continue;
    }

    const rowIdText = rowIdProperty.title[0]?.plain_text;
    if (!rowIdText) {
      continue;
    }
    rowIds.push(rowIdText);
  }

  return rowIds;
}

export async function updateDataSourcePageProperties(
  client: Client,
  dataSourceId: string,
  properties: PropertiesOptions,
  reduceOptions?: NotionReducePropertiesOptions
) {
  const { rowIdColumnName, properties: pageProperties } = properties;
  const pagesIdFilter = createFilterByRowId(rowIdColumnName, pageProperties);
  const dataSource = await client.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      or: pagesIdFilter,
    },
  });

  for (const page of dataSource.results) {
    const isValid = isValidPage(page, rowIdColumnName);
    if (!isValid) {
      continue;
    }

    if (page.properties[rowIdColumnName]?.type !== "title") {
      continue;
    }

    const firstTitle = page.properties[rowIdColumnName].title[0];
    if (!firstTitle) {
      continue;
    }

    const rowId = lower(firstTitle.plain_text);
    const pagePropertiesToUpdate = pageProperties[rowId];
    if (!pagePropertiesToUpdate) {
      continue;
    }

    await updatePageProperty(
      client,
      page.id,
      pagePropertiesToUpdate,
      reduceOptions
    );
  }
}
