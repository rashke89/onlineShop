import React, { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ShopService from '../../../services/ShopService';
import { useDispatch, useSelector } from 'react-redux';
import StripeElements from './StripeElements';
import { showLoader } from '../../../redux-store/loader/loaderSlice';

const stripePromise = loadStripe('pk_test_CXmRg1rMFkKEddYELpl6T8WM00g3eyz8p9');

function OrderProcessStepTree() {

    const [secretKey, setSecretKey] = useState('');
    const dispatch = useDispatch();
    const { cart } = useSelector(state => state.cartStore);

    useEffect(() => {
        dispatch(showLoader(true));
        
        const total = cart.reduce((startPrice, item) => {
            return startPrice + item.totalPrice;
        }, 0);

        ShopService.getPayment({ amount: total, currency: 'eur' })
            .then(response => {
                if (response.status === 200) {
                    console.log(response);
                    setSecretKey(response.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                dispatch(showLoader(false));
            })
    }, [])

    const options = {
        clientSecret: secretKey,
    };

    return (
        <>
            {secretKey && <Elements stripe={stripePromise} options={options}>
                <StripeElements secretKey={secretKey} />
            </Elements>}
        </>
    );
};

export default OrderProcessStepTree;
