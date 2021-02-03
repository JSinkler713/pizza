import React, {useState, useEffect, useContext} from 'react'; 
import { graphql } from 'gatsby';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';
import SEO from '../components/SEO';


const PizzasPage = ({data})=> { 
  const pizzas = data.pizzas.nodes
  const pizzaEls = pizzas.map((pizza)=> {
    console.log('pizza', pizza.name)
    return<h2>{pizza.name}</h2>
  })
    
  return ( 
     <> 
       <SEO title='pizzas' />
       <ToppingsFilter />
       <PizzaList pizzas={pizzas}/>
     </> 
  ) 
} 
export default PizzasPage;

export const query = graphql`
  query AllPizza {
    pizzas: allSanityPizza {
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
