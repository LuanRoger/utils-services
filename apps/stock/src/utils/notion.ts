import { DEFAULT_NOTION_DATE_TIMEZONE } from "@/constants";
import type { PageProperty } from "@/models/properties-options";
import type { NotionReducePropertiesOptions } from "@repo/shared/models";
import type { NotionPageOrDataSource } from "@/types";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export function isValidPage(
  page: NotionPageOrDataSource,
  rowIdColumnName: string
): page is PageObjectResponse {
  if (page.object !== "page") {
    return false;
  }

  const properPage = page as PageObjectResponse;
  const rowIdProperty = properPage.properties[rowIdColumnName];
  if (rowIdProperty?.type !== "title") {
    return false;
  }

  return true;
}

export function reduceProperties(
  properties: PageProperty[],
  options?: NotionReducePropertiesOptions
) {
  const { timeZone = DEFAULT_NOTION_DATE_TIMEZONE } = options ?? {};

  return properties.reduce(
    (acc, { name, type, value }) => {
      switch (type) {
        case "text":
          acc[name] = {
            title: [
              {
                type: "text",
                text: { content: value },
              },
            ],
          };
          break;
        case "number":
          acc[name] = {
            number: value,
          };
          break;
        case "date":
          acc[name] = {
            date: { start: value, time_zone: timeZone },
          };
          break;
      }
      return acc;
    },
    {} as Record<string, any>
  );
}

export function createFilterByRowId(
  rowIdColumnName: string,
  rowIds: string[] | Record<string, PageProperty[]>
) {
  const sanitizedRowIds = Array.isArray(rowIds) ? rowIds : Object.keys(rowIds);
  const pagesIdFilter = sanitizedRowIds.map((rowId) => ({
    property: rowIdColumnName,
    title: {
      equals: rowId,
    },
  }));

  return pagesIdFilter;
}
