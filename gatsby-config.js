import dotenv from 'dotenv'
dotenv.config({ path: '.env'})
export default {
  siteMetadata: {
    title: `Pizza`,
    description:'the best pizza'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: `7yzi77q5`,
        dataset: `production`,
        watchMode: true,
        //under settings/API in manage.sanity.io
        token: process.env.SANITY_TOKEN,
        // a token with read permissions is required
        // if you have a private dataset
        // token: process.env.SANITY_TOKEN,

        // If the Sanity GraphQL API was deployed using `--tag <name>`,
        // use `graphqlTag` to specify the tag name. Defaults to `default`.
      },
    },
  // ...
],
}
