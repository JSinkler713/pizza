import React from 'react';
import Layout from './src/components/Layout'
import { OrderProvider } from './src/components/OrderContext'
//this should look pretty similar to gatsby-browser page

export const wrapRootElement = ({ element }) => {
  return (
    <OrderProvider>
      {element}
    </OrderProvider>
  )
}

//this will wrap all 'pages' that are server side rendered in <Layout/>
export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>
}
