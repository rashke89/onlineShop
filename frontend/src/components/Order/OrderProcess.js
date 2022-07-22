import OrderProcessStepOne from "./components/OrderProcessStepOne";
import React, { useEffect, useState } from "react";
import './order-process.scss'
import { useDispatch, useSelector } from "react-redux";
import OrderProcessStepTwo from "./components/OrderProcessStepTwo";
import StripeElements from "./components/OrderProcessStepTree";
import StepperFooter from "./components/StepperFooter";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setCart } from "../../redux/cartSlice";
import { routeConfig } from "../../config/routeConfig";
import ShopService from "../../services/shopService";
import Succeeded from "./components/paymentMessages/Succeeded";
import Processing from "./components/paymentMessages/Processing";
import Error from "./components/paymentMessages/Error";

function OrderProcess() {

    const { currentStep } = useSelector(state => state.orderProcessStore.orderProcess);
    const [searchParams] = useSearchParams();
    const [msg, setMsg] = useState('');

    useEffect(() => {
        if (searchParams.get('redirect_status'))
            setMsg(searchParams.get('redirect_status'))
    }, [])

    const orderProcessStepsLayout = () => {
        if (msg)
            return <PaymentMessage msg={msg} />
        if (currentStep === 1)
            return <OrderProcessStepOne />
        if (currentStep === 2)
            return <OrderProcessStepTwo />
        if (currentStep === 3)
            return <StripeElements />
    }

    return (
        <>
            {orderProcessStepsLayout()}
            {!msg && currentStep !== 3 && <StepperFooter />}
        </>
    )
}

function PaymentMessage({ msg }) {
    const cart = useSelector(state => state.cartStore.cart);
    const user = useSelector(state => state.userStore.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        userID: user._id,
        order: cart
    });

    useEffect(() => {
        if (msg === 'succeeded') {
            ShopService.ordered(order)
                .then(response => {
                    if (response.status === 200) {
                        console.log(response);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }

        dispatch(setCart([]));
        setTimeout(() => {
            navigate(routeConfig.SHOP.url);
        }, 5000)
    }, []);

    useEffect(() => {
        dispatch(setCart([]));
        localStorage.removeItem("shopCart");
        setTimeout(() => {
            navigate(routeConfig.SHOP.url);
        }, 3000)
    }, [])

    function displayMessage() {
        if (msg === 'succeeded') {
            return <Succeeded />
        } else if (msg === 'processing') {
            return <Processing />
        } else if (msg === 'requires_payment_method') {
            return <Error />
        }
    }

    return (
        <>
            {displayMessage()}
        </>
    )
}

export default OrderProcess;
