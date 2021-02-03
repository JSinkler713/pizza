import React from 'react';
import MenuItemStyles from '../styles/MenuItemStyles'
import Img from 'gatsby-image'
import calculatePizzaPrice from '../utils/calculatePizzaPrice'

  export default function PizzaOrder({ order, pizzas, removeFromOrder, plainImage }) {
    return (
      <>
        <h1>Order</h1>
        <p>You have {order.length} items in your order </p>
        { 
          order.map((singleOrder, index)=> {
            const pizza = pizzas.nodes.find(pizza=> pizza.id === singleOrder.id)
            return (
              <MenuItemStyles key={`${singleOrder.id}- ${index}`}>
                <Img fluid={pizza.image.asset.fluid}/>
                <h2>{pizza.name}</h2>
                <p>${calculatePizzaPrice(pizza.price, singleOrder.size)}
                <button 
                  type='button' 
                  className='remove' 
                  //tells screen readers what this weird x is
                  title={`Remove ${singleOrder.size} ${pizza.name} from Order`}
                  onClick={()=> removeFromOrder(index)}
              > 
                &times;
              </button>
              </p>
            </MenuItemStyles>
          )
        })
      }
    </>
  )
}
