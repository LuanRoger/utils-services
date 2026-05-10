import type { PropertiesNameOption } from "@/models/properties-options";

export const DEFAULT_PORT = 3001;

export const APP_RESPONSES = {
  SECRET_NOT_SET: "Secret not set",
  OK: "OK",
};

export const APP_MESSAGES = {
  CLOSSING_REDIS_CONNECTION: "Closing Redis connection",
  REDIS_CONNECTION_STRING_NOT_SET: "Redis connection string not set",
  CLOSSING_SERVER: "Closing server",
};

export const DEFAULT_PAGE_PROPERTIES_NAME: PropertiesNameOption = {
  actualValue: "Valor Atual",
  dividendYield: "Dividend Yield (%)",
  lastYieldValue: "Último Rendimento",
  lastYieldPercentage: "Último Rendimento (%)",
  lastYieldBasePrice: "Último Rendimento Preço Base",
  lastYieldDate: "Último Rendimento Data",
  nextYieldValue: "Próximo Rendimento",
  nextYieldPercentage: "Próximo Rendimento (%)",
  nextYieldBasePrice: "Próximo Rendimento Preço Base",
  nextYieldDate: "Próximo Rendimento Data",
  pvp: "P/VP",
};

export const FI_STORE_KEY = "fi";
export const FIAGRO_STORE_KEY = "fiagro";
export const CACHE_DURATION = 60 * 30; // 30 minutes
