import { NextApiRequest, NextApiResponse } from "next";

// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items: [{id: string}]) => {
  if (items[0].id == 'pro') {
    return 20;
  } else return 39;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { items } = req.body;

  if (items[0].id == 'free') {
    res.send({ message: "You're already on free plan!" });
  }
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'usd',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    message: 'Payment intent created successfully!',
  });
}
