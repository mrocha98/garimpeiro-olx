export function priceMatches(
  priceFromArgs: number,
  toCompare: number,
  percentage: number
) {
  const parsedPercentage = percentage > 100 ? 0 : percentage / 100

  if (parsedPercentage === 0) return priceFromArgs === toCompare

  const priceWithPercentageApplied = priceFromArgs * parsedPercentage
  const min = Math.round(priceFromArgs - priceWithPercentageApplied)
  const max = Math.round(priceFromArgs + priceWithPercentageApplied)

  return toCompare >= min && toCompare <= max
}
