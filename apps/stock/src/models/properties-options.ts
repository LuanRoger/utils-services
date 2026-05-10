export interface PropertiesOptions {
  rowIdColumnName: string;
  properties: Properties;
}

export interface PagePropertyIdentifier {
  rowId: string;
  rowIdColumnName: string;
}

interface BaseProperty {
  name: string;
}

export type PageProperty =
  | (BaseProperty & { type: "text"; value: string })
  | (BaseProperty & { type: "number"; value: number })
  | (BaseProperty & { type: "date"; value: string });

export type Properties = Record<string, PageProperty[]>;

export interface PropertiesNameOptionRequest {
  actualValue?: string;
  dividendYield?: string;
  pvp?: string;
  lastYieldValue?: string;
  lastYieldPercentage?: string;
  lastYieldBasePrice?: string;
  lastYieldDate?: string;
  nextYieldValue?: string;
  nextYieldPercentage?: string;
  nextYieldBasePrice?: string;
  nextYieldDate?: string;
}

export type PropertiesNameOption = Required<PropertiesNameOptionRequest>;
