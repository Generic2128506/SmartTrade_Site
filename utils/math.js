export const roundTo = (value, precision = 2) =>
  Math.round(value * 10 ** precision) / 10 ** precision;
