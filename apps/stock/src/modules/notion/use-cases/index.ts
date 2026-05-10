import {
  getDataSourceRowIds,
  updateDataSourcePageProperties,
} from "@/services/notion/data-source";
import { Client } from "@notionhq/client";
import { getFiById } from "@/use-casses/status-invest/fiis";
import { getFiagroById } from "@/use-casses/status-invest/fiagro";
import type {
  Properties,
  PropertiesNameOptionRequest,
  PropertiesOptions,
} from "@/models/properties-options";
import { fiiDataToPageProperty } from "@/models/mappers/properties";
import { lower } from "@/utils/string";
import type { NotionReducePropertiesOptions } from "@repo/shared/models";
import { FiNotFound } from "@/models/errors";
import { mergePropertiesNameOption } from "@/utils/object";

export async function updateDataSourceFiisPageProperties(
  client: Client,
  dataSourceId: string,
  rowIdColumnName: string,
  propertiesNameOption?: PropertiesNameOptionRequest,
  reduceOptions?: NotionReducePropertiesOptions,
) {
  const fis = await getDataSourceRowIds(client, dataSourceId, rowIdColumnName);
  const dataSourcePropertiesName =
    mergePropertiesNameOption(propertiesNameOption);

  const properties: Properties = {};
  for (const fi of fis) {
    const fiId = lower(fi);
    try {
      const fiData = await getFiById(fiId);
      properties[fiId] = fiiDataToPageProperty(
        fiData,
        dataSourcePropertiesName,
      );
    } catch (error) {
      if (!(error instanceof FiNotFound)) {
        throw error;
      }
      const fiagro = await getFiagroById(fiId);
      properties[fiId] = fiiDataToPageProperty(
        fiagro,
        dataSourcePropertiesName,
      );
    }
  }

  const propertiesOptions: PropertiesOptions = {
    rowIdColumnName,
    properties,
  };
  await updateDataSourcePageProperties(
    client,
    dataSourceId,
    propertiesOptions,
    reduceOptions,
  );
}

export async function updateDataSourceFiTicketPageProperties(
  client: Client,
  dataSourceId: string,
  rowIdColumnName: string,
  ticket: string,
  propertiesNameOption?: PropertiesNameOptionRequest,
  reduceOptions?: NotionReducePropertiesOptions,
) {
  const fiTicket = lower(ticket);
  const fiData = await getFiById(ticket);

  const pageProperties = fiiDataToPageProperty(
    fiData,
    mergePropertiesNameOption(propertiesNameOption),
  );
  const properties: Properties = {
    [fiTicket]: pageProperties,
  };

  const propertiesOptions: PropertiesOptions = {
    rowIdColumnName,
    properties,
  };
  await updateDataSourcePageProperties(
    client,
    dataSourceId,
    propertiesOptions,
    reduceOptions,
  );
}
