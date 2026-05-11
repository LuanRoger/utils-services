import { DATE_REGEX } from "@/constants";

export function parseDate(value: string | undefined): Date | undefined {
  if (!value) {
    return;
  }

  const [day, month, year] = value
    .split("/")
    .map((value) => Number.parseInt(value, 10));
  const isDateUndefined =
    day === undefined || month === undefined || year === undefined;
  if (isDateUndefined) {
    return;
  }

  const isAnyDatePartNaN =
    Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year);
  if (isDateUndefined || isAnyDatePartNaN) {
    return;
  }

  return new Date(year, month - 1, day);
}

// biome-ignore lint/suspicious/noExplicitAny: This is a JSON reviver function that can handle any value
export function dateReviver(_: string, value: any): any {
  if (typeof value === "string" && DATE_REGEX.test(value)) {
    return new Date(value);
  }

  return value;
}
