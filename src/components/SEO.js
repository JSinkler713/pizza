import React, {useState, useEffect, useContext} from 'react'; 
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'
 
const SEO = ({children, location, image, description, title})=> { 
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)
  console.log(data.site.siteMetadata.title)
  console.log('***********************')
  return ( 
    <Helmet titleTemplate={`%s - ${ data.site.siteMetadata.title }`}>
      <title>{title}</title>
       <html lang='en' />
     </Helmet> 
  ) 
} 
export default SEO;
