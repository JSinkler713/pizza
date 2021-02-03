const sizesMultiplier = {
  S: 0.75,
  M: 1,
  L: 1.25
}

//little helper function to calculate prices at diff sizes
export default function calculatePizzaPrice(price, size) {
  return (price * sizesMultiplier[size]).toFixed(2)
}
