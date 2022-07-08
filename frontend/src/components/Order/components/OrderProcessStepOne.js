import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../../redux-store/cart/cartSlice';
import { FaPlusCircle, FaMinusCircle, FaTimes } from "react-icons/fa";
import { handleCount } from '../../../redux-store/cart/cartSlice';
import './OrderProcessStepOne.scss';

// todo '../ProductCounter'
// todo '../RemoveFromCart'
// ? za sada ne radi
// import ProductCounter from '../../ProductCounter/ProductCounter';
// import RemoveFromCart from '../../RemoveFromCart/RemoveFromCart';

function OrderProcessStepOne() {

    const dispatch = useDispatch();
    const [isRemoved, setIsRemoved] = useState(false);
    const cart = useSelector(state => state.cartStore.cart);

    function handleProductCount(index, isIncrease) {
        dispatch(handleCount({ index, isIncrease }));
    }

    useEffect(() => {
        // console.log(cart);
    }, [cart])

    function renderOrderTable() {
        return cart.map((item, index) => {
            return (
                <tr key={index}>
                    <th scope="col">{index + 1}</th>
                    <td scope="col">
                        <img src={item.images[0]} alt={item.title} />
                    </td>
                    <td scope="col">{item.title}</td>
                    <td scope="col" className="count">
                        {/* // todo '../ProductCounter'
                        // ? za sada ne radi
                        <ProductCounter /> */}
                        <span><FaMinusCircle onClick={() => handleProductCount(index, false)} /></span>
                        <span>{item.count}</span>
                        <span><FaPlusCircle onClick={() => handleProductCount(index, true)} /></span>
                    </td>
                    <td scope="col">${item.totalPrice}</td>
                    <td scope="col"><FaTrashAlt onClick={() => {
                        dispatch(removeItem(index));
                        setIsRemoved(true);
                        setTimeout(() => {
                            setIsRemoved(false);
                        }, 2500);
                    }} /></td>
                    {/* // todo '../RemoveFromCart'
                    // ? za sada ne radi
                    <td scope="col"><RemoveFromCart /></td> */}
                </tr>
            )
        })
    }

    return (
        <>
            {
                isRemoved &&
                <div className="remove-product-message">
                    <FaTimes /> Product is successfully removed
                </div>
            }
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Count</th>
                        <th scope="col">Price</th>
                        <th scope="col">&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {cart && cart.length ? renderOrderTable() : <tr>Cart is empty, you have no products to buy. Go and add products to cart then come back.</tr>}
                </tbody>
            </table>

        </>
    )
}

export default OrderProcessStepOne;
