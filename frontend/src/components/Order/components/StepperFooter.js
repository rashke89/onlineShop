import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { handleCurrentStep, stepTwoIsSubmitted } from "../../../redux/orderProcessSlice";
import { ToastContainer, toast } from 'react-toastify';
import AuthService from "../../../services/authService";

function StepperFooter({ submitPayment }) {
    const { currentStep } = useSelector(state => state.orderProcessStore.orderProcess);
    const { isSubmit, isValid } = useSelector(state => state.orderProcessStore.orderProcess.stepTwo);
    const { cart } = useSelector(state => state.cartStore);
    const dispatch = useDispatch();

    useEffect(() => {
    }, [currentStep]);

    const next = (number) => {
        if (currentStep === 1)
            validateStepOne(number);
        if (currentStep === 2) {
            dispatch(stepTwoIsSubmitted());
            isValid && dispatch(handleCurrentStep(currentStep + 1));
        }
    };

    const validateStepOne = (number) => {
        if (!cart.length) {
            toast.error('Shop cart is empty.');
            return
        }
        if (!AuthService.isUserLoggedIn()) {
            toast.error('Please log in.');
            return;
        }
        dispatch(handleCurrentStep(currentStep + 1))
    };

    const prev = () => {
        dispatch(handleCurrentStep(currentStep - 1))
    }

    return (
        <>
            <div className={`w-100 d-flex my-5 ${currentStep > 1 ? 'justify-content-between' : 'justify-content-end'}`}>
                {currentStep > 1 && <button className="btn btn-primary" onClick={e => prev(-1)}>prev</button>}
                {currentStep === 3 ? <button className="btn btn-primary" onClick={e => submitPayment()}>Submit</button> : <button className="btn btn-primary" onClick={e => next()}>next</button>}

            </div>
            <ToastContainer />
        </>

    )
}

export default StepperFooter;
