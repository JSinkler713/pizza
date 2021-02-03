import React, {useState, useEffect, useContext} from 'react'; 
import Layout from '../components/Layout'
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/Pagination'
import SEO from '../components/SEO';

const StyledSlicemasterGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`

const StyledSlicemaster = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    text-align: center;
  }
  .description {
    background: var(--yellow);
    padding: 1 rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 2;
    position: relative;
    text-align: center;
  }
  
`


// destructuring props.data.people.nodes
// const SliceMastersPage = ({data:{people:{nodes}}})=> { 

const SliceMastersPage = ({data, pageContext})=> { 
  const nodes = data.people.nodes
  const people = nodes.map(person=> (
      <StyledSlicemaster>
        <Link to={`/slicemaster/${person.slug.current}`}>
          <h2 className='mark'>{person.name}</h2>
        </Link>
        <Img fluid={person.image.asset.fluid} alt = {person.name}/>
      <p>{person.description}</p>
      </StyledSlicemaster>
  ))

  return ( 
     <> 
       <SEO title='people'/>
       <Pagination
          pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
          totalCount={data.people.totalCount}
          currentPage={pageContext.currentPage || 1}
          skip={pageContext.skip}
          base="/slicemasters"
        />
      <StyledSlicemasterGrid>
         {people}
      </StyledSlicemasterGrid>
     </> 
  ) 
} 
export default SliceMastersPage;

export const query = graphql`
  query GetPeople($skip: Int=0, $pageSize: Int=2) {
    people: allSanityPerson(skip: $skip, limit:$pageSize) {
      totalCount
      nodes{
        id
        name
        description
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
      }
    }
  }
`

