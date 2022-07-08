import React from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../redux-store/cart/cartSlice';

function RemoveFromCart() {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cartStore.cart);

    return (
        <>
            {
                cart.map((item, index) => {
                    return <FaTrashAlt onClick={() => dispatch(removeItem(index))} />
                })
            }
        </>
    )
}

export default RemoveFromCart;
