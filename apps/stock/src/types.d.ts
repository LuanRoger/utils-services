import {
  PageObjectResponse,
  PartialPageObjectResponse,
  PartialDataSourceObjectResponse,
  DataSourceObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

type Env = {
  NOTION_INTEGRATION_SECRET: string;
};

export type NotionPageOrDataSource =
  | PageObjectResponse
  | PartialPageObjectResponse
  | PartialDataSourceObjectResponse
  | DataSourceObjectResponse;
