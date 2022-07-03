import React from 'react';
import './order-process.scss';
import OrderProcessStepOne from "./components/OrderProcessStepOne";
import {useSelector} from "react-redux";
import OrderProcessStepTwo from "./components/OrderProcessStepTwo";
import StepperFooter from "./components/StepperFooter";
import OrderProcessStepThree from "./components/OrderProcessStepThree";

const OrderProcess = () => {
	const {currentStep} = useSelector(state => state.orderProcessStore.orderProcess);

	const orderProcessStepsLayout = () => {
		if(currentStep === 1) {
			return <OrderProcessStepOne />;
		} else if(currentStep === 2) {
			return <OrderProcessStepTwo />
		} else {
			return <OrderProcessStepThree />
		}
	}

	return (
		<>
			{orderProcessStepsLayout()}
			<StepperFooter />
		</>
	);
};

export default OrderProcess;