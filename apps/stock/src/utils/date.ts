export function parseDate(value: string | undefined): string | undefined {
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

  const parsedDate = new Date(year, month - 1, day);
  return parsedDate.toISOString();
}
