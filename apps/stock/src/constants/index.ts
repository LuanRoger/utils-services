export const FI_STORE_KEY = "fii";
export const FIAGRO_STORE_KEY = "fiagro";
export const FI_CACHE_DURATION = 60 * 30; // 30 minutes

export const DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/;

export const FETCH_USER_AGENT = "@utils/stock";

export const APP_RESPONSES = {
  SECRET_NOT_SET: "Secret not set",
  OK: "OK",
};

export const APP_MESSAGES = {
  CLOSSING_REDIS_CONNECTION: "Closing Redis connection",
  REDIS_CONNECTION_STRING_NOT_SET: "Redis connection string not set",
  CLOSSING_SERVER: "Closing server",
};
