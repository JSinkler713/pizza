import React from 'react'
import { ItemsGrid, SingleGridItem } from '../styles/Grids'

// we can't use Gatsby image because these are getting rendered after the build
// we are using sanity options for width height crop
export default function HomeItemGrid({ items }) {
  return(
    <ItemsGrid>
      {items.map((item)=> (
        <SingleGridItem>
          <p>
            <span className='mark'>{item.name}</span>
          </p>
          <img 
            style={{
              background: `url(${item.image.asset.metadata.lqip})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
            width='500' height='400'
            src={`${item.image.asset.url}?w=500&h=400&fit=crop`}
            alt={item.name} />
        </SingleGridItem>
      ))}
    </ItemsGrid>
  )
}
