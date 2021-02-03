import React from 'react'
import { ItemsGrid, SingleGridItem } from '../styles/Grids'


export default function LoadingGrid({ count }) {
  return(
    <ItemsGrid>
      {Array.from({ length: count }, (_, index)=> (
        <SingleGridItem>
          <p>
            <span className='mark'>Loading</span>
          </p>
          <img src='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==' className='loading' alt='Loading' width='500' height='400'/>
        </SingleGridItem>
      ))}
    </ItemsGrid>
  )
}
