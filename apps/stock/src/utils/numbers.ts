export function parseNumber(value: string | undefined): number | undefined {
  if (!value) {
    return undefined;
  }

  const sanitizedValue = value.replace(",", ".");
  const parsedValue = parseFloat(sanitizedValue);
  if (isNaN(parsedValue)) {
    return undefined;
  }

  return parsedValue;
}
