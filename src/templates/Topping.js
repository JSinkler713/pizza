// this was the SinglePizza, change to show only pizzas that have the certain topping clicked on
import React, {useState, useEffect, useContext} from 'react'; 
import { graphql } from 'gatsby'
import Img from 'gatsby-image';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';
import styled from 'styled-components'

const ToppingHeader = styled.h1`
  margin-bottom: 20px;
`

const PizzasFilteredByTopping = ({data, pageContext})=> { 
  console.log(pageContext.name)
  const pizzas = data.pizzas.nodes
  const pizzaEls = pizzas.map((pizza)=> {
    console.log('pizza', pizza.name)
    return<h2>{pizza.name}</h2>
  })
    
  return ( 
     <> 
       <ToppingsFilter activeTopping={pageContext.name}/>
       <ToppingHeader className='center'>Pizzas with {pageContext.name}</ToppingHeader>
       <PizzaList pizzas={pizzas}/>
     </> 
  ) 
} 
//the export allows it to be part of our props on our page, it will be exported as data
//this filters with our pageContext variable name supplied up in gatsby-node 
export const query = graphql`
  query ThePizzas($name: String!) {
    pizzas: allSanityPizza(filter: {toppings: {elemMatch: {name: {eq: $name}}}}){
      nodes {
        name
        _id
        slug {
           current
        }
        image {
          asset {
            fluid(maxWidth:400) {
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

export default PizzasFilteredByTopping;

