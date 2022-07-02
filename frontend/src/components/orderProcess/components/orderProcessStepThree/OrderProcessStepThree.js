import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import PaymentService from "../../../../services/PaymentService";
import {loadStripe} from "@stripe/stripe-js";
import {Elements, PaymentElement} from "@stripe/react-stripe-js";
const stripePromise=loadStripe('pk_test_51LG51YFqRcJByTttZBK0izaj8wX6gDgJcYLDGU1r2wt9xNukcJOhTgbXdI1XqKPBv78ACc3wkO7AgguOBIAkHIW500kqSv67Pj')

const OrderProcessStepThree = () => {

    const {cart}=useSelector(state=>state.cartStore)
    const dispatch=useDispatch;
    const [skFromStripe, setSkFromStripe]=useState('')

    useEffect(() => {
      PaymentService.initPayment({amount:300})
          .then((response)=>{
              console.log(response.data);
              setSkFromStripe(response.data)
          })
          .catch(error=> console.log(error))
    }, []);

    const options={
        clientSecret:skFromStripe
    }

    return (
        <>
            {skFromStripe &&
                <Elements stripe={stripePromise} options={options}>
            <PaymentElement/>
            </Elements>}
        </>
    );
};

export default OrderProcessStepThree;
