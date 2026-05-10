import type { FiiData } from "@/models/fii";
import {
  STATUS_INVEST_CLASS_SELECTORS,
  STATUS_INVEST_NOT_FOUND_PAGE_ELEMENT,
  STATUS_INVEST_NOT_FOUND_PAGE_TEXT,
} from "@/services/status-invest/constants";
import { parseDate } from "@/utils/date";
import { parseNumber } from "@/utils/numbers";
import { FiNotFoundRule, FiParseError } from "@/models/errors";
import type { HTMLElement } from "node-html-parser";

export function parseFiPage(page: HTMLElement): FiiData {
  const name = page.querySelector(
    STATUS_INVEST_CLASS_SELECTORS.NAME
  )?.innerText;
  const actualValue = page.querySelector(
    STATUS_INVEST_CLASS_SELECTORS.ACTUAL_VALUE
  )?.innerText;
  const dividendYield = page.querySelector(
    STATUS_INVEST_CLASS_SELECTORS.DIVIDEND_YIELD
  )?.innerText;
  const pvp = page.querySelector(STATUS_INVEST_CLASS_SELECTORS.PVP)?.innerText;
  const segment = page.querySelector(
    STATUS_INVEST_CLASS_SELECTORS.SEGMENT
  )?.innerText;
  const lastYieldValue = page.querySelector(
    STATUS_INVEST_CLASS_SELECTORS.YIELD.LAST_YIELD_VALUE
  )?.innerText;
  const lastYieldPercentage = page.querySelector(
    STATUS_INVEST_CLASS_SELECTORS.YIELD.LAST_YIELD_PERCENTAGE
  )?.innerText;
  const lastYieldBasePrice = page.querySelector(
    STATUS_INVEST_CLASS_SELECTORS.YIELD.LAST_YIELD_BASE_PRICE
  )?.innerText;
  const lastYieldDate = page.querySelector(
    STATUS_INVEST_CLASS_SELECTORS.YIELD.LAST_YIELD_DATE
  )?.innerText;
  const nextYieldValue = page.querySelector(
    STATUS_INVEST_CLASS_SELECTORS.YIELD.NEXT_YIELD_VALUE
  )?.innerText;
  const nextYieldPercentage = page.querySelector(
    STATUS_INVEST_CLASS_SELECTORS.YIELD.NEXT_YIELD_PERCENTAGE
  )?.innerText;
  const nextYieldBasePrice = page.querySelector(
    STATUS_INVEST_CLASS_SELECTORS.YIELD.NEXT_YIELD_BASE_PRICE
  )?.innerText;
  const nextYieldDate = page.querySelector(
    STATUS_INVEST_CLASS_SELECTORS.YIELD.NEXT_YIELD_DATE
  )?.innerText;

  const notFoundPageElement = page.querySelector(
    STATUS_INVEST_NOT_FOUND_PAGE_ELEMENT
  )?.innerText;
  const notFoundPageElementText = notFoundPageElement
    ?.trim()
    .includes(STATUS_INVEST_NOT_FOUND_PAGE_TEXT);
  if (notFoundPageElementText) {
    throw new FiNotFoundRule();
  }

  if (!name || !actualValue || !dividendYield) {
    throw new FiParseError();
  }

  const lastYieldValueParsed = parseNumber(lastYieldValue);
  const lastYieldPercentageParsed = parseNumber(lastYieldPercentage);
  const lastYieldBasePriceParsed = parseNumber(lastYieldBasePrice);
  const lastYieldDateParsed = parseDate(lastYieldDate);

  const nextYieldValueParsed = parseNumber(nextYieldValue);
  const nextYieldPercentageParsed = parseNumber(nextYieldPercentage);
  const nextYieldBasePriceParsed = parseNumber(nextYieldBasePrice);
  const nextYieldDateParsed = parseDate(nextYieldDate);

  const doesHaveLastYieldData =
    lastYieldValueParsed !== undefined &&
    lastYieldPercentageParsed !== undefined &&
    lastYieldBasePriceParsed !== undefined &&
    lastYieldDateParsed !== undefined;
  const doesHaveNextYieldData =
    nextYieldValueParsed !== undefined &&
    nextYieldPercentageParsed !== undefined &&
    nextYieldBasePriceParsed !== undefined &&
    nextYieldDateParsed !== undefined;

  const fiiData: FiiData = {
    name,
    actualValue: parseNumber(actualValue) ?? 0,
    dividendYield: parseNumber(dividendYield) ?? 0,
    pvp: parseNumber(pvp) ?? 0,
    segment,
    yield: {
      lastYield: doesHaveLastYieldData
        ? {
            value: lastYieldValueParsed,
            percentage: lastYieldPercentageParsed,
            basePrice: lastYieldBasePriceParsed,
            date: lastYieldDateParsed,
          }
        : undefined,
      nextYield: doesHaveNextYieldData
        ? {
            value: nextYieldValueParsed,
            percentage: nextYieldPercentageParsed,
            basePrice: nextYieldBasePriceParsed,
            date: nextYieldDateParsed,
          }
        : undefined,
    },
  };

  return fiiData;
}
