export function parseDate(value: string | undefined): Date | undefined {
  if (!value) {
    return undefined;
  }

  const [day, month, year] = value.split("/").map((v) => parseInt(v));
  const isDateUndefined =
    day === undefined || month === undefined || year === undefined;
  if (isDateUndefined) {
    return undefined;
  }

  const isAnyDatePartNaN = isNaN(day) || isNaN(month) || isNaN(year);
  if (isDateUndefined || isAnyDatePartNaN) {
    return undefined;
  }

  return new Date(year, month - 1, day);
}

export function dateReviver(_: string, value: any): any {
  if (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(value)
  ) {
    return new Date(value);
  }

  return value;
}
