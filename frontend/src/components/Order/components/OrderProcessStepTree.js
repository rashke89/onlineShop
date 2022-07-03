import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import ShopService from "../../../services/shopService";
import {loadStripe} from "@stripe/stripe-js";
import {Elements, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";

const stripePromise = loadStripe('pk_test_51LE86WICBi42q51NTvYro1xsDdciS1c7P588igQVzS0sAF64k9cDdJxlyxufgIeSdQcI7v83lPO4MPrzqGtdG3yV00n15bVGRe')

function OrderProcessStepTree({sk}) {
    const stripe = useStripe();
    const elements = useElements();

    const submitPayment = async () => {
        if (!stripe || !elements || !sk)
            return;

        const paymentResponse  = await stripe.confirmPayment({
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
                <h1>step 3</h1>
                <PaymentElement/>
                <button className="btn" onClick={e => submitPayment()}>Submit</button>
            </div>}
        </>
    )
}

function StripeElements() {
    const [sk, setSk] = useState('');
    const {cart} = useSelector(state => state.cartStore);
    const options = {
        clientSecret: sk
    };

    useEffect(() => {
        console.log(cart);
        let sumPrice = cart.reduce((state, item) => {
            return state + item.totalPrice;
        }, 0)

        console.log(sumPrice);
        ShopService.initPayment({amount: sumPrice})
            .then(response => {
                console.log(response.data);
                setSk(response.data)
            })
            .catch(err => console.log(err))
    }, []);
    return (
        <>
            {sk && <Elements stripe={stripePromise} options={options}>
                <OrderProcessStepTree sk={sk}/>
            </Elements>}
        </>
    )
}

export default StripeElements;
