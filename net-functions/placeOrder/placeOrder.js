// handler  netlify docs AWS serverless function under the hood
//require from our local node_modules
const nodemailer = require('nodemailer');


/* [ORDER] EXAMPLE
  {
    id: '-3b9ce132-a297-57f2-bd1c-0e1d4f7e7394',
    size: 'M',
    name: 'Piggy Smalls',
    thubmnail: 'https://cdn.sanity.io/images/7yzi77q5/production/7f7b7f9a4bf9f06192a5f1df8090cc7acc2706c6-640x640.jpg?w=100&h=100&fit=crop',
    price: 15.77
  }
*/

function generateOrderEmail({ order, total }) {
  return `
    <div>
      <p>Please bike on over, we will have your order ready in the next 20 minutes.</p>
      <ul>
        ${order.map(item=> `<li>
          <img src='${item.thumbnail}' alt='${item.name}' />
          ${item.size} ${item.name} ${item.price}
        </li>`
        )}
      </ul>
      <style>
        ul {
          list-style: none;
        }
      </style>
      <p>Your total is $${total} due at pickup</p>
    </div>`;
}


// create a transport for nodemailer
// use ethereal.email with dummy account, really easy
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    auth: {
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS 
    }
});


// this will be at localhost:8888/.netlify/functions/placeOrder
exports.handler = async (event, context) => {
  // turn body back into an object
  let body = await JSON.parse(event.body)
  const requiredFields = ['email', 'name', 'order']
  for (const field of requiredFields) {
    //check field is there
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `You need to include the ${field} field`
        })
      }
    }
  }
  // if order is empty
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `You need to include something to order, like a pizza..`
      })
    }
  }
  // if honeypot is filled out, in other words if bots filled out
  // the hidden form input
  // the field is breadNButter
  if (body.breadNButter) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Sorry bots go away`
      })
    }
  }
  const info = await transporter.sendMail({
    from: 'Slicks slices <slick@example.com>',
    to:`${body.email}` ,
    subject: `${body.name}'s order`,
    html: generateOrderEmail({order:body.order, total:body.total})
  })
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Your order has been placed! Please check your email ${body.email} for more info.`
    })
  }
}
