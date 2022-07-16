import React, {useEffect, useState} from 'react';
import './order-process.scss';
import OrderProcessStepOne from "./components/OrderProcessStepOne";
import {useDispatch, useSelector} from "react-redux";
import OrderProcessStepTwo from "./components/OrderProcessStepTwo";
import StepperFooter from "./components/StepperFooter";
import StripeElements from "./components/OrderProcessStepThree";
import {useNavigate, useSearchParams} from "react-router-dom";
import {setCart} from "../../redux/cartSlice";
import {routeConfig} from "../../config/routeConfig";

const OrderProcess = () => {
	const {currentStep} = useSelector(state => state.orderProcessStore.orderProcess);
	const [searchParams] = useSearchParams();
	const [message, setMessage] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		if(searchParams.get('redirect_status')) {
			setMessage(searchParams.get('redirect_status'))
		}
	}, []);

	const orderProcessStepsLayout = () => {
		if(message) {
			return <PaymentMessage message={message} />;
		}
		if(currentStep === 1) {
			return <OrderProcessStepOne />;
		} else if(currentStep === 2) {
			return <OrderProcessStepTwo />
		} else {
			return <StripeElements />
		}
	}

	return (
		<>
			{orderProcessStepsLayout()}
			{!message && <StepperFooter />}
		</>
	);
};

function PaymentMessage({message}) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(setCart([]));
		localStorage.removeItem("shopCart");
		setTimeout(() => {
			navigate(routeConfig.SHOP.url);
		}, 3000)

	}, []);

	return(
		<>
			<h2>{message}</h2>
		</>
	)
}

export default OrderProcess;