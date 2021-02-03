// little helper function to calculate total 
import calculatePizzaPrice from './calculatePizzaPrice'

export default function calculateTotal(order, nodes) {
  // nice use of reduce
  let total = order.reduce((runningTotal, singleOrder)=> {
    // for each order, find the pizza that matches the order
    const pizza = nodes.find(pizza=> pizza.id === singleOrder.id);
    // calculate the price of the current pizza in the order and add to accumulator
    // convert to number it was acting up
    let pizzaPrice = Number(calculatePizzaPrice(pizza.price, singleOrder.size))
    return runningTotal + pizzaPrice
  }, 0)
  return total
}
