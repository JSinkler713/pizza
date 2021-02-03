import { useState, useContext } from 'react';
import { OrderContext } from '../components/OrderContext'
import calculateTotal from './calculateTotal'
import attachNamesAndPrices from './attachNamesAndPrices'

export default function usePizza({ pizzas, values }) {
  // make some state for order
  const [order, setOrder] = useContext(OrderContext)
  // handle error
  const [error, setError ] = useState();
  const [loading, setLoading ] = useState(false);
  const [message, setMessage ] = useState(null);
  

  // make an add to order function
  const addToOrder = (orderedPizza) => {
    setOrder([ ...order, orderedPizza ])
  }
  
  // make a remove from order function
  const removeFromOrder = (index) => {
    setOrder([ ...order.slice(0, index), ...order.slice(index+1)])
  }

  // handle form submit
  const submitOrder = async(e)=> {
    e.preventDefault()
    setLoading(true)
    const body = {
      order: [ ...attachNamesAndPrices(order, pizzas)],
      total: Number(calculateTotal(order, pizzas).toFixed(2)),
      name: values.name,
      email: values.email,
      breadNButter: values.breadNButter
    }
    // thats in order so now call the serverless function
    // in this case /.netlify/functions/placeOrder
    // in .env GATSBY_SERVERLESS_BASE=http://localhost:8888/.netlify/functions
    // everything with GATSBY_ will be available on the browser
    // GATSBY_SERVERLESS_BASE
    let result = await fetch(process.env.GATSBY_SERVERLESS_BASE + `/placeOrder`, {
      method: 'POST',
      headers: {
       'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    const { message } = JSON.parse(await result.text())
    // check if good status.
    // if not... between 400 and 600
    if (result.status >= 400 && result.status < 600) {
      setLoading(false)
      setError(message)
    } else {
      setLoading(false)
      setMessage(message)
      setError(null)

    }

  }


  return { order, addToOrder, removeFromOrder, error, loading, message, submitOrder}
}
