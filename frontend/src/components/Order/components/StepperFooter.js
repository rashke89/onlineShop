import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {handleCurrentStep} from "../../../redux/orderProcessSlice";

const StepperFooter = () => {
	const {currentStep} = useSelector(state => state.orderProcessStore.orderProcess);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log(currentStep);
	}, [currentStep]);

	const currentStepHandler = (number) => {
		dispatch(handleCurrentStep(currentStep + number));
	}

	return (
		<div className={`stepper-footer mt-4 ${currentStep === 1 ? 'justify-content-end' : 'justify-content-between'}`}>
			{currentStep > 1 &&
					<button type="button" className="btn btn-outline-info" onClick={e => currentStepHandler(-1)}>
					<i className="bi bi-chevron-double-left me-1"></i>Prev
				</button>
			}
			<button type="button" className="btn btn-outline-info" onClick={e => currentStepHandler(1)}>
				Next<i className="bi bi-chevron-double-right ms-1"></i>
			</button>
		</div>
	);
};

export default StepperFooter;