/**
 * Format a price in Algerian Dinar (DA)
 */
export function formatPrice(amount: number): string {
  // Use simple string formatting to avoid SSR/client hydration mismatch
  const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${formatted} DA`;
}
