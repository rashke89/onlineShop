import React, { useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { handleCurrentStep, stepTwoIsSubmitted } from '../../../redux-store/cart/orderProcessSlice';
import { ToastContainer, toast } from 'react-toastify';
import AuthService from '../../../services/AuthService';
import './StepperFooter.scss';


function StepperFooter({ submitPayment }) {

    const dispatch = useDispatch();
    const { currentStep } = useSelector(state => state.orderProcessStore.orderProcess);
    const isValid = useSelector(state => state.orderProcessStore.orderProcess.stepTwo.isValid);
    const form = useSelector(state => state.orderProcessStore.orderProcess.stepTwo.form);

    useEffect(() => {

    }, [currentStep])

    // * CHECK CURRENT STEP
    const proceed = () => {
        if (currentStep === 1) {
            validateStepOne();
        } else if (currentStep === 2) {
            validateStepTwo();
        }
    }

    // * VALIDATE STEPS ONE
    const validateStepOne = () => {
        // * if cart is empty buttons wont be displayed
        // if (!cart.length) {
        //     toast.error('Cart is empty');
        //     return;
        // }
        if (!AuthService.isUserLoggedIn()) {
            toast.error('Have to be logged in');
            return;
        }
        dispatch(handleCurrentStep(1));
    }

    // * VALIDATE STEPS TWO
    const validateStepTwo = () => {
        console.log(form);
        dispatch(stepTwoIsSubmitted(true));
        isValid && dispatch(stepTwoIsSubmitted(false)) && dispatch(handleCurrentStep(1));
    }

    const back = () => {
        if (currentStep > 1) {
            dispatch(handleCurrentStep(-1));
        }
        console.log(form);
    }

    const backButtonText = () => {
        if (currentStep === 2)
            return 'Back to cart'
        if (currentStep === 3)
            return 'Back to form'
    }

    return (
        <>
            <ToastContainer />

            <div className="buttons-wrapper" style={currentStep === 1 ? { justifyContent: 'flex-end' } : { justifyContent: 'space-between' }}>

                {
                    currentStep > 1 && <button onClick={back} className="btn btn-warning btn-back"> <FaChevronLeft />
                        {backButtonText()}</button>
                }

                {
                    currentStep === 3 ?
                        <button onClick={submitPayment} className="btn btn-success btn-proceed">Submit Payment <FaChevronRight /></button> :
                        <button onClick={proceed} className="btn btn-success btn-proceed">Proceed <FaChevronRight /></button>
                }

            </div>
        </>
    )
}

export default StepperFooter;