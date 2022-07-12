import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ShopService from "../../../services/shopService";
import {loadStripe} from "@stripe/stripe-js";
import {Elements, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";

const stripePromise = loadStripe('pk_test_51LIxQ0GspIrbt6HI0X8GdcwOPmQ7DExFW9spCJh3HcAlh5mtpOziVhRUhM4vnU31NvDJYiktqVo3JrJTXgwJEuyc00KVDYTD4N');

const OrderProcessStepThree = () => {
	const stripe = useStripe();
	const elements = useElements();
	const dispatch = useDispatch();

	const submitPayment = async () => {
		if (!stripe || !elements) {
			return;
		}

		const paymentResponse = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: "http://localhost:3000/order",
			},
		});
	}

	return (
		<>
			{
				stripe &&
				<div className="step-three-wrapper">
					<div className="row w-75 mx-auto mt-5">
						<div className="col-12">
							<PaymentElement/>
							<button className="btn btn-outline-info" onClick={e => submitPayment()}>
								Order <i className="bi bi-credit-card"></i>
							</button>
						</div>
					</div>
				</div>
			}
		</>
	);
};

function StripeElements() {
	const [secretKey, setSecretKey] = useState('');
	const {cart} = useSelector(state => state.cartStore);

	const options = {
		clientSecret: secretKey
	}

	useEffect(() => {
		let sum = cart.reduce((state, item) => {
			return state + item.totalPrice;
		}, 0)

		ShopService.initPayment({amount: sum})
			.then(res => {
				setSecretKey(res.data);
			})
			.catch(error => {
				console.log(error);
			})
	}, []);
	return (
		<>
			{secretKey &&
				<Elements stripe={stripePromise} options={options} key={options.clientSecret}>
					<OrderProcessStepThree secretKey={secretKey}/>
				</Elements>
			}
		</>
	)
}

export default StripeElements;