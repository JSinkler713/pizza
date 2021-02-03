import React, {useState, useEffect, useContext} from 'react'; 
import Img from 'gatsby-image'
import {graphql} from 'gatsby' 
import SEO from '../components/SEO'

const SingleSlicer = ({pageContext, data})=> { 
  return ( 
    <>
     <SEO image={data.person.image.asset.src} title={pageContext.name} />
     <div className='center'> 
       {data.person.image ? <Img fluid={data.person.image.asset.fluid} alt = {data.person.name}/>: 'Web owner please add image'}
       <h2>
         <span className='mark'>{pageContext.name}</span>
       </h2>
       <p>{data.person.description}</p>
     </div> 
    </>
  ) 
} 
export default SingleSlicer;


export const query =  graphql`
  query($slug: String!) {
    person: sanityPerson(slug: {current: {eq: $slug}}) {
      name
      id
      image {
        asset {
          fluid(maxWidth:500, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
      description
    }
  }
`
