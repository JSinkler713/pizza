// doesn't actually import graphql anything, but helps with syntax highlighting
const gql = String.raw
const details = 
gql`
  name
  _id
  slug {
    current
  }
  image {
    asset{
      url
      metadata {
        lqip
      }
    }
  }
`
import { useState, useEffect } from 'react'

function useLatestData() {
    const [hotSlices, setHotSlices] = useState();
    const [slicemasters, setSlicemasters] = useState();

  useEffect(()=> {
    //on load fetch data
    //regular fetch request to sanity graphql deployed
    //will be up to date, not when built
    fetch(process.env.GATSBY_SANITY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          query: gql`
            query{
              StoreSettings(id: "downtownstore") {
                name
                slicemaster {
                  ${details}
                }
                hotSlices {
                  ${details}
                }
              }
            }
          `,
        })
    })
    .then((res)=> res.json())
    .then(result=> {
      console.log(result.data)
      setSlicemasters(result.data.StoreSettings.slicemaster)
      setHotSlices(result.data.StoreSettings.hotSlices)
    })
    .catch((err)=> {
      console.log(err)
    })

  }, [])
  //return both pieces of state
  return {
    slicemasters,
    hotSlices
  }
}
export default useLatestData;
