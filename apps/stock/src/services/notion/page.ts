import { type PageProperty } from "@/models/properties-options";
import { type NotionReducePropertiesOptions } from "@repo/shared/models";
import { reduceProperties } from "@/utils/notion";
import { Client } from "@notionhq/client";

export async function updatePageProperty(
  client: Client,
  id: string,
  properties: PageProperty[],
  options?: NotionReducePropertiesOptions
) {
  const notionProperties = reduceProperties(properties, options);

  await client.pages.update({
    page_id: id,
    properties: notionProperties,
  });
}
