import React, { useContext, useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from 'react-router-dom';
const CheckoutForm = ({ cart, price }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    if (typeof price !== 'number' || price < 1) {
      console.error('Invalid price value. Must be a number greater than or equal to 1.');
      return;
    }

    axios.post(`${process.env.REACT_APP_BASEURL}/create-payment-intent`, { price })
      .then(res => {
        console.log(res.data.clientSecret);
        console.log(price);
        setClientSecret(res.data.clientSecret);
      })
  }, [price]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });
    if (error) {
      console.log('[error]', error);
      setCardError(error.message);

    } else {
      setCardError('Success!');
      console.log('[PaymentMethod]', paymentMethod);
    }
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || 'anonymous',
            email: user?.email || 'unknown'
          },
        },
      },
    );

    if (confirmError) {
      console.log(confirmError)
    }

    console.log('paymentIntent', paymentIntent)
    if (paymentIntent.status === "succeeded") {
      const transitionId = paymentIntent.id;
      setCardError(`Your transitionId is: ${transitionId}`)

      // save payment info to server
      const paymentInfo = {
        email: user.email,
        transitionId: paymentIntent.id,
        price, quantity: cart.length,
        status: "order pending",
        itemsName: cart.map(item => item.name),
        cartItems: cart.map(item => item._id),
        menuItems: cart.map(item => item.menuItemId)
      }

      // send payment info
      await axios.post(`${process.env.REACT_APP_BASEURL}/payments`, paymentInfo)
        .then(res => {
          console.log(res.data)
          if (res.data) {
            alert('Payment info sent successfully!')
            navigate('/order')
          }
        })
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start gap-8">
      {/* Order Summary */}
      <div className="md:w-1/2 w-full space-y-5">
        <h4 className="text-lg font-semibold">Order Summary</h4>
        <p>Total Price: ${price}</p>
        <p>Number of Items: {cart.length}</p>
      </div>

      {/* Payment Section */}
      <div
        className={`md:w-1/3 w-full border space-y-5 card shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-8 sm:align-middle`}
      >
        <h4 className="text-lg font-semibold">Process your Payment!</h4>
        <h5 className="font-medium">Credit/Debit Card</h5>
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit"
            // disabled={!stripe || !clientSecret}
            className="btn btn-primary btn-sm mt-5 w-full"
          >
            Pay
          </button>
        </form>
        {cardError ? <p className="text-red text-xs italic">{cardError}</p> : ""}
      </div>
    </div>
  );
};

export default CheckoutForm;
