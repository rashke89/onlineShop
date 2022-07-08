import React from 'react';
import StepperFooter from './StepperFooter';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';

function StripeElements({ secretKey }) {
    const stripe = useStripe();
    const elements = useElements();

    const submitPayment = async () => {
        if (!stripe || !elements || !secretKey) {
            return;
        }

        const paymentResponse = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/order"
            }
        });
    }

    return (
        <>
            <PaymentElement />
            <StepperFooter submitPayment={submitPayment} />
        </>
    );
}

export default StripeElements;