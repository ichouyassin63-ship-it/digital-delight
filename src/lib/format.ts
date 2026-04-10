/**
 * Format a price in Algerian Dinar (DA)
 */
export function formatPrice(amount: number): string {
  return `${amount.toLocaleString("fr-DZ")} DA`;
}
