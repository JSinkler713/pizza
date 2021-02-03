import React, {useState, useContext, createContext} from 'react'

// create order context
const OrderContext = createContext();

const OrderProvider = (props) => {
  const [order, setOrder] = useState([])
  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {props.children}
    </OrderContext.Provider>
  )
}
export { OrderContext, OrderProvider }
