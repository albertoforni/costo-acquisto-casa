export function agencyFeePercentage({
  price,
  percentage,
}: {
  price: number;
  percentage: number;
}): number {
  return price * (percentage / 100) * 1.22;
}
