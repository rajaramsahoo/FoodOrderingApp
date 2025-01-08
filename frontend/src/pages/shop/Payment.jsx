import React from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';
import { useCartContext } from '../../hooks/useCart';
const stripePromise = loadStripe('pk_test_51QeqccGfGkEIsIf4A7OdhSEIoj1pg31GTfdwicZsOt3fRdiwOodUidzBoT1t3dyK8Kf2PrdLEewixkd0ifgXjtlg00SHeTbgcW')

const Payment = () => {
    const { cart } = useCartContext()
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalPrice = parseFloat(cartTotal.toFixed(2));
    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 py-28'>
            <Elements stripe={stripePromise}>
                <CheckoutForm cart={cart} price={totalPrice} />
            </Elements>
        </div>
    )
}

export default Payment