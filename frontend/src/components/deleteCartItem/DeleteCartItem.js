import React from 'react';
import {removeItem} from "../../redux/cartSlice";
import {useDispatch} from "react-redux";

const DeleteCartItem = ({index}) => {
    const dispatch=useDispatch();
    const removeItemFromCart = (index) => {
        dispatch(removeItem(index));
    }
    return (
        <div className="shop-cart-delete-item col-2 text-center"
             onClick={() => {
                 removeItemFromCart(index)
             }}>
            <i className="bi bi-trash-fill"></i>
        </div>
    );
};

export default DeleteCartItem;
