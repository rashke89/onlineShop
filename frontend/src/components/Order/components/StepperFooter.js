import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {handleCurrentStep, stepTwoIsSubmitted} from "../../../redux/orderProcessSlice";
import { ToastContainer, toast } from 'react-toastify';
import AuthService from "../../../services/authService";

const StepperFooter = () => {
	const {cart} = useSelector(state => state.cartStore);
	const {currentStep} = useSelector(state => state.orderProcessStore.orderProcess);
	const {isSubmit} = useSelector(state => state.orderProcessStore.orderProcess.stepTwo);
	const dispatch = useDispatch();

	const next = (number) => {
		if(currentStep === 1) {
			validateStepOne(number);
		}
		if(currentStep === 2) {
			dispatch(stepTwoIsSubmitted());
			dispatch(handleCurrentStep(currentStep + 1));
		}
	}

	const prev = () => {
		dispatch(handleCurrentStep(currentStep - 1));
	}

	const validateStepOne = (number) => {
		if(!cart.length) {
			toast.error('Cart is empty.');
			return;
		}

		if(!AuthService.isUserLoggedIn()) {
			toast.error('Please login.');
			return;
		}
		dispatch(handleCurrentStep(currentStep + 1));
	}

	return (
		<>
			<div className={`stepper-footer mt-4 ${currentStep === 1 ? 'justify-content-end' : 'justify-content-between'}`}>
				{currentStep > 1 &&
					<button type="button" className="btn btn-outline-info" onClick={e => prev(-1)}>
						<i className="bi bi-chevron-double-left me-1"></i>Prev
					</button>
				}
				<button type="button" className="btn btn-outline-info" onClick={e => next()}>
					Next<i className="bi bi-chevron-double-right ms-1"></i>
				</button>
			</div>
			<ToastContainer />
		</>
	);
};

export default StepperFooter;