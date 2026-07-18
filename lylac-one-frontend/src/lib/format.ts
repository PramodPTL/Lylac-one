/**
 * Formats a count for compact display: 1204 -> "1.2K", 754 -> "754".
 * Mirrors `Intl.NumberFormat("en", { notation: "compact" })` but avoids
 * pulling in a full locale-aware path for a single, predictable use case.
 */
export function formatCompactNumber(value: number): string {
  if (value < 1000) return String(value);
  return `${(value / 1000).toFixed(1)}K`;
}
