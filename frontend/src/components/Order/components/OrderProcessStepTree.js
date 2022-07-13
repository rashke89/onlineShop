import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import ShopService from "../../../services/shopService";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import StepperFooter from "./StepperFooter";

const stripePromise = loadStripe('pk_test_51LE86WICBi42q51NTvYro1xsDdciS1c7P588igQVzS0sAF64k9cDdJxlyxufgIeSdQcI7v83lPO4MPrzqGtdG3yV00n15bVGRe')

function OrderProcessStepTree({ sk }) {
    const stripe = useStripe();
    const elements = useElements();

    const submitPayment = async () => {
        if (!stripe || !elements || !sk)
            return;

        const paymentResponse = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://localhost:3000/order",
            },
        });
    }

    return (
        <>
            {stripe && <div>
                <PaymentElement />
                <StepperFooter submitPayment={submitPayment} />
            </div>}
        </>
    )
}

function StripeElements() {
    const [sk, setSk] = useState('');
    const { cart } = useSelector(state => state.cartStore);
    const {currency} = useSelector(state => state.currencyStore)
    const options = {
        clientSecret: sk
    };

    useEffect(() => {
        // console.log(cart);
        let currToLow = currency.toLowerCase()
        let sumPrice = cart.reduce((state, item) => {
            return state + item.totalPrice;
        }, 0)

        // console.log(sumPrice);
        ShopService.initPayment({ amount: sumPrice, currency: currToLow })
            .then(response => {
                console.log(response.data);
                setSk(response.data)
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <>
            {sk && <Elements stripe={stripePromise} options={options}>
                <OrderProcessStepTree sk={sk} />
            </Elements>}
        </>
    )
}

export default StripeElements;
