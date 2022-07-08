import React from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { handleCount } from '../../redux-store/cart/cartSlice';

function ProductCounter() {

    const dispatch = useDispatch();
    const { cart } = useSelector(state => state.cartStore);

    function handleProductCount(index, isIncrease) {
        dispatch(handleCount({ index, isIncrease }));
    }

    return (
        <>
            {
                cart.map((item, index) => {
                    return (
                        <>
                            <span><FaMinusCircle onClick={() => handleProductCount(index, false)} /></span>
                            <span>{item.count}</span>
                            <span><FaPlusCircle onClick={() => handleProductCount(index, true)} /></span>
                        </>
                    )
                })
            }

        </>
    )
}

export default ProductCounter;
