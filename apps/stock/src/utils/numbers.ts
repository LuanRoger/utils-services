export function parseNumber(value: string | undefined): number | undefined {
  if (!value) {
    return;
  }

  const sanitizedValue = value.replace(",", ".");
  const parsedValue = Number.parseFloat(sanitizedValue);
  if (Number.isNaN(parsedValue)) {
    return;
  }

  return parsedValue;
}
