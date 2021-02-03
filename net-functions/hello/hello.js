// handler  netlify docs AWS serverless function under the hood

// this will be at localhost:8888/.netlify/functions/hello
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: 'Hello'
  }
}
