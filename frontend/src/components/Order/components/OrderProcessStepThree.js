import {useDispatch, useSelector,} from "react-redux";
import React, {useEffect, useState} from "react";
import shopService from "../../../services/shopService";
import {loadStripe} from "@stripe/stripe-js";
import {Elements, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";

const stripePromise = loadStripe('pk_test_51LE86WICBi42q51NTvYro1xsDdciS1c7P588igQVzS0sAF64k9cDdJxlyxufgIeSdQcI7v83lPO4MPrzqGtdG3yV00n15bVGRe');

function OrderProcessStepThree(sk) {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const submitPayment = async () => {
        if (!stripe || !elements || !sk)
            return;
        const paymentResponse = await stripe.confirmPayment({
                elements,
            confirmParams: {
                    return_url: "http://localhost:3000/order",
            },
        });
        console.log(paymentResponse);
    }

    return (
        <>
            {sk && <div>
           <h1>step 3</h1>
                <PaymentElement/>
                <button className="btn" onClick={e => submitPayment()}>Submit</button>
            </div>}
        </>
    )
}
function StripeElements(){

    const [sk, setSk] = useState('');
    const {cart} = useSelector(state => state.cartStore);
    const options = {
        clientSecret: sk
    }

    useEffect(() => {
        console.log(cart);
        let sumPrice = cart.reduce((state, item) => {
            console.log('fina price...',state);
            console.log('item... ',item);
            return state + item.totalPrice;
        }, 0) //drugi parametara je inicijalna vrednost koja se koristi u funkciji reduce(state-slobodan naziv)
        console.log(sumPrice);


        shopService.initPayment({amount: 300})
            .then(response => {
                console.log(response.data);
                setSk(response.data);
            })
            .catch(err => console.log(err))
    }, []);
    return (
        <>
            {sk && <Elements stripe={stripePromise} options={options}>
                <OrderProcessStepThree sk={sk}/>
            </Elements>}
            )
        </>
    )
}
export default StripeElements;
