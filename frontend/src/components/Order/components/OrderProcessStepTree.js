import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import ShopService from "../../../services/shopService";
import {loadStripe} from "@stripe/stripe-js";
import {Elements, PaymentElement} from "@stripe/react-stripe-js";

const stripePromise = loadStripe('pk_test_51LE86WICBi42q51NTvYro1xsDdciS1c7P588igQVzS0sAF64k9cDdJxlyxufgIeSdQcI7v83lPO4MPrzqGtdG3yV00n15bVGRe')

function OrderProcessStepTree() {
    const {cart} = useSelector(state => state.cartStore);
    const [sk, setSk] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('order proces step 3...', cart);
        ShopService.initPayment({amount: 300})
            .then(response => {
                console.log(response.data);
                setSk(response.data)
            })
            .catch(err => console.log(err))
    }, []);

    const options = {
        clientSecret: sk
    }

    return (
        <>
            {sk && <Elements stripe={stripePromise} options={options}>
                <h1>step 3</h1>
                <PaymentElement/>
            </Elements>}

        </>
    )
}

export default OrderProcessStepTree;
