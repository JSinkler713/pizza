import React, {useState, useEffect, useContext} from 'react'; 
import {Link} from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components'

const PizzaGridStyles = styled.div`
  display: grid;
  gap: 4rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: auto auto 500px;
`

const SinglePizzaStyles = styled.div`
  display: grid;
  grid-auto-rows: auto auto 400px;
`

// helper component
const Toppings = ({toppings})=> (
  <>
    <p>{toppings.length ? toppings.map(topping=> topping.name).join(', '): 'No Toppings'}</p>
  </>
)

// helper component
const SinglePizza = ({pizza})=> (
  <SinglePizzaStyles>
    <Link to={`/pizza/${pizza.slug.current}`}>
      <h2>{pizza.name}</h2>
    </Link>
    <Toppings toppings={pizza.toppings}/>
    {pizza.image ? <Img fluid={pizza.image.asset.fluid} alt = {pizza.name}/>: 'Web owner please add image'}
  </SinglePizzaStyles>
)
 
const PizzaList = ({pizzas})=> { 
  //map through for all pizzas return a <SinglePizza/> with <Toppings/> component
  const pizzaList = pizzas.map(pizza=>(
    <>
      <SinglePizza key={pizza._id} pizza={pizza}/>
    </>
  ))

  return ( 
     <PizzaGridStyles> 
       {pizzaList}
     </PizzaGridStyles> 
  ) 
} 
export default PizzaList;
