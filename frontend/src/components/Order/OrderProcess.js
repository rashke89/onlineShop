import OrderProcessStepOne from "./components/OrderProcessStepOne";
import React from "react";
import './order-process.scss'
import {useSelector} from "react-redux";
import OrderProcessStepTwo from "./components/OrderProcessStepTwo";
import OrderProcessStepTree from "./components/OrderProcessStepTree";
import StepperFooter from "./components/StepperFooter";

function OrderProcess() {
    const {currentStep} = useSelector(state => state.orderProcessStore.orderProcess);

    const orderProcessStepsLayout = () => {
        if (currentStep === 1)
            return <OrderProcessStepOne/>
        if (currentStep === 2)
            return <OrderProcessStepTwo/>
        if (currentStep === 3)
            return <OrderProcessStepTree/>
    }

    return (
        <>
            {orderProcessStepsLayout()}
            <StepperFooter/>
        </>
    )
}

export default OrderProcess;
