import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ShopService from "../../../services/shopService";
import {loadStripe} from "@stripe/stripe-js";
import {Elements, PaymentElement} from "@stripe/react-stripe-js";

const stripePromise = loadStripe('pk_test_51LIxQ0GspIrbt6HI0X8GdcwOPmQ7DExFW9spCJh3HcAlh5mtpOziVhRUhM4vnU31NvDJYiktqVo3JrJTXgwJEuyc00KVDYTD4N');

const OrderProcessStepThree = () => {
	const {cart} = useSelector(state => state.cartStore);
	const [secretKey, setSecretKey] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		ShopService.initPayment({amount: 300})
			.then(res => {
				setSecretKey(res.data);
			})
			.catch(error => {
				console.log(error);
			})
	}, []);

	const options = {
		clientSecret: secretKey
	}

	return (
		<>
			{
				secretKey &&
				<Elements stripe={stripePromise} options={options} key={options.clientSecret}>
					<PaymentElement />
				</Elements>
			}
		</>
	);
};

export default OrderProcessStepThree;