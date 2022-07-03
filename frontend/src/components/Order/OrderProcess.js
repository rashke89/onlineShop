import OrderProcessStepOne from "./components/OrderProcessStepOne";
import React, {useEffect, useState} from "react";
import './order-process.scss'
import {useDispatch, useSelector} from "react-redux";
import OrderProcessStepTwo from "./components/OrderProcessStepTwo";
import StripeElements from "./components/OrderProcessStepTree";
import StepperFooter from "./components/StepperFooter";
import {useNavigate, useSearchParams} from "react-router-dom";
import {setCart} from "../../redux/cartSlice";
import {routeConfig} from "../../config/routeConfig";

function OrderProcess() {
    const {currentStep} = useSelector(state => state.orderProcessStore.orderProcess);
    const [searchParams] = useSearchParams();
    const [msg, setMsg] = useState('');

    useEffect(() => {
        if (searchParams.get('redirect_status'))
            setMsg(searchParams.get('redirect_status'))
    }, [])
    const orderProcessStepsLayout = () => {
        if (msg)
            return <PaymentMessage msg={msg}/>
        if (currentStep === 1)
            return <OrderProcessStepOne/>
        if (currentStep === 2)
            return <OrderProcessStepTwo/>
        if (currentStep === 3)
            return <StripeElements/>
    }

    return (
        <>
            {orderProcessStepsLayout()}
            {!msg && <StepperFooter/>}
        </>
    )
}

function PaymentMessage({msg}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(setCart([]));
        setTimeout(() => {
            navigate(routeConfig.SHOP.url);
        }, 3000)
    })
    return (
        <>
            <h2>{msg}</h2>
        </>
    )
}

export default OrderProcess;
