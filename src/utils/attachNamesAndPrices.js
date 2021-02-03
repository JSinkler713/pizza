// import helper function
import calculatePizzaPrice from './calculatePizzaPrice';

// little helper function to calculate prices at diff sizes
export default function attachNamesAndPrices(order, pizzas) {
  const updatedOrder = order.map(item=> {
    const pizza = pizzas.find(pizza=> pizza.id === item.id);
    return({
      ...item,
      name: pizza.name,
      thumbnail: pizza.image.asset.fluid.src,
      price: Number(calculatePizzaPrice(pizza.price, item.size))
    })
  })
  return updatedOrder
}
