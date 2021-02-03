import React, {useState, useEffect, useContext} from 'react'; 
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components'


const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    &.active {
    background: var(--yellow);
    }
  }
`

function countPizzasInToppings(pizzas) {
  const counts = pizzas.map((pizza)=> pizza.toppings).flat().reduce((acc, topping)=> {
    //check if existing, if it is increment, else create new
    const existingTopping = acc[topping.id]
    if (existingTopping) {
      existingTopping.count += 1 
    } else {
      acc[topping.id] ={
        count: 1,
        id: topping.id,
        name: topping.name
      }
    }
    return acc
  }, {});
  //now we have an object with all the counts
  //sort by count lowest to highest
  // const sortedToppings = Object.values(counts).sort((a,b)=> a.count - b.count)
  const sortedToppings = Object.values(counts).sort((a,b)=> b.count - a.count)
  //returns in sorted order an array of the obj's
  return sortedToppings
}
 
const ToppingsFilter = ({ activeTopping })=> { 
  //get a list of all toppings
  const toppingsData = useStaticQuery(graphql`
    query AllToppings {
      allSanityTopping {
        nodes {
          name
          vegetarian
          id
        }
      }
      allSanityPizza {
        nodes {
          name
          id
          toppings {
            id
            name
            vegetarian
          }
        }
      }

    }
  `);
  const toppings = toppingsData.allSanityTopping.nodes
  console.log(toppings)

  //get a list of all pizzas with their toppings
  const pizzas = toppingsData.allSanityPizza.nodes
  console.log(pizzas)
  //count how many pizzas are in each topping
  const toppingsWithCount = countPizzasInToppings(pizzas)
 

  //get a list of all pizzas with their toppings
  return ( 
    <ToppingsStyles> 
         <Link to={`/pizzas`} key={'allPizza'} className={'allPizza' === activeTopping ? 'active' : ''}>
           <span className='name'>All</span>
           <span className='count'>{pizzas.length}</span>
         </Link>
     {
       toppingsWithCount.map((topping)=> (
         <Link to={`/topping/${topping.name}`} key={topping.id} className={topping.name === activeTopping ? 'active' : ''}>
           <span className='name'>{topping.name}</span>
           <span className='count'>{topping.count}</span>
         </Link>
       ))
     }
    </ToppingsStyles> 
  ) 
} 
export default ToppingsFilter



