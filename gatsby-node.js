/* eslint-disable prettier/prettier */
// after data has been pulled in
// comes from node
import path from 'path';
// import fetch to work with node
import fetch from 'isomorphic-fetch'


async function fetchNodesTurnIntoCoffees({ actions, createNodeId, createContentDigest}) {
  console.log('this will fetch nodes for coffees')
  const res = await fetch('https://sampleapis.com/coffee/api/hot')
  const hotCoffees = await res.json()
  await console.log(hotCoffees)
  for (const coffee of hotCoffees) {
    // const nodeContent = JSON.stringify(coffee)
    const nodeMeta = {
      id: createNodeId(`coffee-${coffee.title}`),
      parent: null,
      children: [],
      internal: {
        type:'Coffee',
        mediaType: 'application/json',
        contentDigest: createContentDigest(coffee),
      }
    }
    actions.createNode({
      ...coffee,
      ...nodeMeta,
    })
  }
  // for loop done
}

// SOURCING NODES
export async function sourceNodes(params){
  await Promise.all([
    fetchNodesTurnIntoCoffees(params)
  ])
}

// create single pages of each pizza
async function turnPizzasIntoPages({ graphql, actions }) {
  // the path has the .js because it needs the whole file
  // this will be the component we use to create the pages
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // get Pizza info from Sanity
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `)
  data.pizzas.nodes.forEach(pizza=> {
    actions.createPage({
      // what is the url? use the slug we have access to
      path:`pizza/${pizza.slug.current}`,
      // what is the component?
      component: pizzaTemplate,
      context:{
        slug: pizza.slug.current,
      }

    })

  })
}
// create pages with all pizzas of specific topping
async function turnToppingsIntoPages({ graphql, actions }) {
  // the path has the .js because it needs the whole file
  // this will be the component we use to create the pages
  const toppingTemplate = path.resolve('./src/templates/Topping.js');
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          id
          name 
        }
      }
    }
  `)
  data.toppings.nodes.forEach(topping=> {
    actions.createPage({
      // what is the url? use the slug we have access to
      path:`topping/${topping.name}`,
      // what is the component?
      component: toppingTemplate,
      context:{
        name: topping.name,
      }

    })
  })
}
async function turnSlicemastersIntoPages({ graphql, actions }) {
  // query all slicemasters here
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson{
        totalCount
        nodes{
          name
          id
          slug {
            current
          }
        }
      }
    }
  `)
  // TODO turn each slicemaster into their own page
  data.slicemasters.nodes.forEach((slicemaster)=> {
    actions.createPage({
      path:`slicemaster/${slicemaster.slug.current}`,
      component: path.resolve('src/templates/SingleSlicer.js'),
      context: {
        name: slicemaster.name,
        slug: slicemaster.slug.current
      }
    })
  })

  



  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize)
  console.log(`There are ${data.slicemasters.totalCount} people, and we will have ${pageCount}`)
  // also paginate based on how many slicemasters, and how many per page
  // loop from 1 - NumberOfPages
  Array.from({ length: pageCount }).forEach((_, i)=> {
    //
    console.log('creating page', i)
    actions.createPage({
      // what is the url? use the slug we have access to
      path:`slicemasters/${i+1}`,
      component: path.resolve('src/pages/slicemasters.js'),
      //data to pass to template
      context:{
        //bc we already rendered them
        skip: i * pageSize,
        currentPage: i+1,
        pageSize,
      }
    })
  })
  // refactor slicemasters to except arg to pull each set for the pages
}


// calling our earlier functions in here
export async function createPages(params){
  // not dependent on each other, so we can have both run concurrently
  // await turnPizzasIntoPages(params)
  // await turnToppingsIntoPages(params)
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params)
  ])
}














