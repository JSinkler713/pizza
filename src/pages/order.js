import React, {useState, useEffect, useContext} from 'react'; 
import Layout from '../components/Layout'
import PizzaOrder from '../components/PizzaOrder'
import SEO from '../components/SEO'
import useForm from '../utils/useForm'
import usePizza from '../utils/usePizza'
import calculateTotal from '../utils/calculateTotal'
import Img from 'gatsby-image'
import calculatePizzaPrice from '../utils/calculatePizzaPrice'
import OrderStyles from '../styles/OrderStyles.js'
import MenuItemStyles from '../styles/MenuItemStyles.js'

const OrderPage = ({data: {pizzas}})=> { 
  const {nodes} = pizzas
  //custom hook to handle state tied to form
  const {values, updateValues} = useForm({ name:'', email:'', breadNButter:''})
  const {order, addToOrder, removeFromOrder, error, loading, message, submitOrder} = usePizza({ pizzas: nodes, values: values})

  if (message) {
    return <>{message}</>
  }
  return ( 
     <> 
       <SEO title='Order'/>
       Order Page
       <OrderStyles onSubmit={submitOrder}>
         <fieldset disabled={loading}>
           <legend>Your Info</legend>
           <label htmlFor="name">Name</label>
           <input type="text" name="name" value={values.name} onChange={updateValues}/>
           <label htmlFor="email">Email</label>
           <input type="email" name="email" value={values.email} onChange={updateValues} />
           <input className='breadNButter'  type="breadNButter" name="breadNButter" value={values.breadNButter} onChange={updateValues} />
         </fieldset>
         <fieldset disabled={loading} className='menu'>
           <legend>Menu</legend>
           {nodes.map(node=>
           <MenuItemStyles key={node.id}>
             <Img
               width='50'
               height='50'
               fluid={node.image.asset.fluid}
               alt={node.name}
             />
             <div>
               <h2>{node.name}</h2>
             </div>
             <div>
               {['S', 'M', 'L'].map(size=>(
                 <button type='button' onClick={()=> addToOrder({
                   id: node.id,
                   size: size
                 })}>
                   {size} {calculatePizzaPrice(node.price, size)}
                 </button>
               ))}
             </div>
           </MenuItemStyles>)}
         </fieldset>
         <fieldset disabled={loading} className='order'>
           <legend>Order</legend>
           <PizzaOrder order={order} removeFromOrder={removeFromOrder} pizzas={pizzas} />
         </fieldset>
         <fieldset>
           <h3>Your total is ${calculateTotal(order, nodes).toFixed(2)}</h3>
           <div>
             {error ? <p>Error: {error} </p> : ''}
           </div>
           <button type='submit' disabled={loading}>
             {loading ? 'Placing Order' : 'Order Ahead' } 
           </button>
         </fieldset>
       </OrderStyles>
     </> 
  ) 
} 
export default OrderPage;

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
           current
        }
        image {
          asset {
            fluid(maxWidth:100) {
              ...GatsbySanityImageFluid
            }
          }
        }
        price
        toppings {
          id
          name
        }
      }
    }
  }
`
