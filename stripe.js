const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

async function createCheckoutSession(req, res) {
  const { email } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: { name: "AI Content Generator Subscription" },
          unit_amount: 1000
        },
        quantity: 1
      }],
      mode: "subscription",
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url:
