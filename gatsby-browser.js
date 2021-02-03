import React from 'react';
import Layout from './src/components/Layout'
import { OrderProvider } from './src/components/OrderContext'

// gives access to context throughout
export const wrapRootElement = ({ element }) => {
  return (
    <OrderProvider>
      {element}
    </OrderProvider>
  )
}

//this will wrap all 'pages' in the browser
export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>
}
