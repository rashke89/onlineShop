import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCart } from '../../../redux-store/cart/cartSlice';
import { routeConfig } from '../../../config/routeConfig';

function PaymentMessage({ message }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (message === 'succeeded') {
            dispatch(setCart([]));
        }
        setTimeout(() => {
            navigate(routeConfig.SHOP.url);
        }, 5000)
    }, []);

    return (
        <>
            <h1>{message}</h1>
        </>
    )
}

export default PaymentMessage;
