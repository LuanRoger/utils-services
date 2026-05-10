import type { FiiData } from "../fii";
import type {
  PageProperty,
  PropertiesNameOption,
} from "../properties-options";

export function fiiDataToPageProperty(
  value: FiiData,
  options: PropertiesNameOption
): PageProperty[] {
  const properties: PageProperty[] = [];
  const {
    actualValue,
    dividendYield,
    lastYieldValue,
    lastYieldPercentage,
    lastYieldBasePrice,
    lastYieldDate,
    nextYieldValue,
    nextYieldPercentage,
    nextYieldBasePrice,
    nextYieldDate,
    pvp,
  } = options;

  properties.push({
    name: actualValue,
    type: "number",
    value: value.actualValue,
  });
  properties.push({
    name: dividendYield,
    type: "number",
    value: value.dividendYield,
  });
  properties.push({
    name: pvp,
    type: "number",
    value: value.pvp,
  });
  if (lastYieldValue && value.yield.lastYield) {
    properties.push({
      name: lastYieldValue,
      type: "number",
      value: value.yield.lastYield.value,
    });
  }
  if (lastYieldPercentage && value.yield.lastYield) {
    properties.push({
      name: lastYieldPercentage,
      type: "number",
      value: value.yield.lastYield.percentage,
    });
  }
  if (lastYieldBasePrice && value.yield.lastYield?.basePrice) {
    properties.push({
      name: lastYieldBasePrice,
      type: "number",
      value: value.yield.lastYield.basePrice,
    });
  }
  if (lastYieldDate && value.yield.lastYield?.date) {
    properties.push({
      name: lastYieldDate,
      type: "date",
      value: value.yield.lastYield.date.toISOString(),
    });
  }
  if (nextYieldValue && value.yield.nextYield?.value) {
    properties.push({
      name: nextYieldValue,
      type: "number",
      value: value.yield.nextYield.value,
    });
  }
  if (nextYieldPercentage && value.yield.nextYield?.percentage) {
    properties.push({
      name: nextYieldPercentage,
      type: "number",
      value: value.yield.nextYield.percentage,
    });
  }
  if (nextYieldBasePrice && value.yield.nextYield?.basePrice) {
    properties.push({
      name: nextYieldBasePrice,
      type: "number",
      value: value.yield.nextYield.basePrice,
    });
  }
  if (nextYieldDate && value.yield.nextYield?.date) {
    properties.push({
      name: nextYieldDate,
      type: "date",
      value: value.yield.nextYield.date.toISOString(),
    });
  }

  return properties;
}
