import React, { useState, useEffect } from 'react'
import OrderProcessStepOne from './components/OrderProcessStepOne';
import OrderProcessStepTwo from './components/OrderProcessStepTwo';
import OrderProcessStepTree from './components/OrderProcessStepTree';
import { useSelector } from 'react-redux';
import StepperFooter from './components/StepperFooter';
import { useSearchParams } from 'react-router-dom';
import PaymentMessage from './components/PaymentMessage';

function OrderProcess() {

    const { cart } = useSelector(state => state.cartStore);
    const { currentStep } = useSelector(state => state.orderProcessStore.orderProcess);

    const [paymentMessage, setPaymentMessage] = useState('');
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get('redirect_status')) {
            setPaymentMessage(searchParams.get('redirect_status'))
        }
    }, []);

    const currentStepLayout = () => {
        if (paymentMessage)
            return <PaymentMessage message={paymentMessage} />
        if (currentStep === 1)
            return <OrderProcessStepOne />
        if (currentStep === 2)
            return <OrderProcessStepTwo />
        if (currentStep === 3)
            return <OrderProcessStepTree />
    }

    function handleStepperFooter(){
        if(cart.length && !paymentMessage && currentStep !== 3)
            return <StepperFooter />
    }

    return (
        <>
            {currentStepLayout()}
            {handleStepperFooter()}

        </>
    )
}

export default OrderProcess;
