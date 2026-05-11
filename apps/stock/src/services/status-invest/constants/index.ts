export const STATUS_INVEST_BASE_URL = "https://statusinvest.com.br";
export const STATUS_INVEST_FII_PATH = "/fundos-imobiliarios";
export const STATUS_INVEST_FIAGRO_PATH = "/fiagros";
export const STATUS_INVEST_FII_BASE_URL = `${STATUS_INVEST_BASE_URL}${STATUS_INVEST_FII_PATH}/`;
export const STATUS_INVEST_FIAGRO_BASE_URL = `${STATUS_INVEST_BASE_URL}${STATUS_INVEST_FIAGRO_PATH}/`;

export const STATUS_INVEST_CLASS_SELECTORS = {
  NAME: "h1.lh-4",
  ACTUAL_VALUE:
    ".special > div:nth-child(1) > div:nth-child(1) > strong:nth-child(3)",
  DIVIDEND_YIELD:
    "div.pb-7:nth-child(4) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > strong:nth-child(2)",
  PVP: ".top-info-md-3 > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > strong:nth-child(2)",
  SEGMENT:
    ".top-info-sm-2 > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > a:nth-child(1) > strong:nth-child(1)",
  YIELD: {
    LAST_YIELD_VALUE:
      "#dy-info > div:nth-child(2) > div:nth-child(1) > strong:nth-child(2)",
    LAST_YIELD_PERCENTAGE:
      "#dy-info > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > b:nth-child(1)",
    LAST_YIELD_BASE_PRICE:
      "#dy-info > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > b:nth-child(2)",
    LAST_YIELD_DATE:
      "#dy-info > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > b:nth-child(1)",
    NEXT_YIELD_VALUE:
      "div.bg-secondary:nth-child(3) > div:nth-child(2) > div:nth-child(1) > strong:nth-child(2)",
    NEXT_YIELD_PERCENTAGE:
      "div.bg-secondary:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > b:nth-child(1)",
    NEXT_YIELD_BASE_PRICE:
      "div.bg-secondary:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > b:nth-child(2)",
    NEXT_YIELD_DATE:
      "div.bg-secondary:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > b:nth-child(1)",
  },
};

export const STATUS_INVEST_NOT_FOUND_PAGE_ELEMENT = "h1.fw-100_";
export const STATUS_INVEST_NOT_FOUND_PAGE_TEXT =
  "Não encontramos o que você está procurando";
