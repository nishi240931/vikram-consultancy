/**
 * Formats numbers into currency strings (e.g., $45,000 or ₹35,00,000).
 */
export function formatCurrency(
  amount: number,
  currency: "USD" | "INR" | "GBP" | "EUR" | "AUD" | "CAD" = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats date strings or Date objects into human-readable strings.
 */
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  }
): string {
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", options).format(d);
}

/**
 * Formats large numbers into compact strings (e.g., 15K+, 1.2M).
 */
export function formatCompactNumber(number: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(number);
}

/**
 * Formats percentages with customizable decimal places.
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}
