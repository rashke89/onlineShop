import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {handleCurrentStep, stepTwoIsSubmit, stepTwoIsSubmitted} from "../../../../redux/orderProcessSlice";
import {ToastContainer, toast} from 'react-toastify';
import AuthService from "../../../../services/AuthService";


const StepperFooter = () => {

    const {currentStep} = useSelector(state => state.orderProcessStore.orderProcess);
    const dispatch = useDispatch();
    const {cart} = useSelector(state => state.cartStore)
    const {isSubmit}=useSelector(state=>state.orderProcessStore.orderProcess.stepTwo);

    useEffect(() => {

        console.log(currentStep);
    }, [currentStep]);


    const next = () => {
        if (currentStep === 1) {
            validateStepOne()
        }

        if (currentStep === 2) {
        dispatch(stepTwoIsSubmitted())
        }

    }


    const validateStepOne = () => {
        if (!cart.length) {
            toast.error("Cart is empty.")
            return
        }
        if (!AuthService.isUserLoggedIn()) {
            toast.error('Please log in.')
            return
        }

        dispatch(handleCurrentStep(currentStep + 1))

    }
    const prev = () => {
        dispatch(handleCurrentStep(currentStep - 1))
    }

    return (
        <>
            <div className={`w-100 d-flex justify-content-${currentStep > 1 ? "between" : "end"} mt-3`}>
                {currentStep > 1 ?
                    <button className="btn btn-secondary" onClick={(event) => prev()}>Previous step</button> : null}
                {currentStep <= 3 ? <button className="btn btn-secondary"
                                            onClick={(event) => next()}>{currentStep === 3 ? "Pay" : "Next step"}</button> : null}
            </div>
                <ToastContainer/>

        </>

    );
};

export default StepperFooter;
