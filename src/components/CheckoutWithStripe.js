import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";
// import "./visacard/App.css";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const stripePromise = loadStripe("pk_test_51Jk1xaLniJHlv8HxI4y3ayREJPn1h1XQTefiBwjCaJYakgD4iG99mbnYYCyjcn5EaiKZtnYLEx30aE5PizWJ4lDp00Gp9V6hIP");
export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axios({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      url: 'http://localhost:4000/api/create-payment-intent',
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => setClientSecret(res.data.clientSecret))
  }, []);

  const appearance = {
    theme: 'flat',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}
