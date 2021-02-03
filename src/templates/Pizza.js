import React, {useState, useEffect, useContext} from 'react'; 
import { graphql } from 'gatsby'
import Img from 'gatsby-image';

//the export allows it to be part of our props on our page, it will be exported as data

//this needs to be dynamic, and has access to all of our pageContext variables already

//slug is passed through context and we have access to it
export const query =  graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: {current: {eq: $slug}}) {
      name
      id
      image {
        asset {
          fluid(maxWidth:800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      price
      toppings{
        name
        vegetarian
      }
    }
  }
`


// helper component
const Toppings = ({toppings})=> (
  <>
    <p>{toppings.length ? toppings.map(topping=> topping.name).join(', '): 'No Toppings'}</p>
  </>
)




const checkForVeggie = (pizza)=> {
  let veggie = true
  console.log('***********************')
  console.log(pizza.toppings[0].vegetarian)
  if (pizza.toppings.length > 0) {
    pizza.toppings.forEach(topping=> {
      if (!topping.vegetarian) {
        veggie = false
      }
    })
  }
  return veggie
}

//the real component Layout
const SinglePizzaPage = ({ data })=> { 
  //if veggie we will display little 🌱, check all toppings
  const isVeggie = checkForVeggie(data.pizza)
  return ( 
     <div> 
<h1>{data.pizza.name}{isVeggie? '🌱':''}</h1>
        <h2>${data.pizza.price}</h2>
        {data.pizza.image ? <Img fluid={data.pizza.image.asset.fluid} alt = {data.pizza.name}/>: 'Web owner please add image'}
        <Toppings toppings={data.pizza.toppings}/>
     </div> 
  ) 
} 
export default SinglePizzaPage;
