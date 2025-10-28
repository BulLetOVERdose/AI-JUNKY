import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe("your_publishable_key_here");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("http://localhost:5000/create-payment-intent", { amount: 10 });
    const clientSecret = data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) }
    });

    if (result.error) setMessage(result.error.message);
    else if (result.paymentIntent.status === "succeeded") setMessage("Payment successful! 🎉");
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay $10</button>
      <p>{message}</p>
    </form>
  );
};

export default function PaymentForm() {
  return <Elements stripe={stripePromise}><CheckoutForm /></Elements>;
}

