
import "./shopCart.scss"
import React from 'react';
import {FaCartPlus} from "react-icons/fa";
import {useSelector} from "react-redux";

const ShopCart = () => {

    const {cart}=useSelector((state)=>{
      return  state.cartStore
    })


    return (
        <div className="shop-cart-wrapper nav-link  text-light">
        <FaCartPlus/>
            <span className="cartBadge badge rounded-pill bg-warning text-dark">1</span>
            </div>

    );
};

export default ShopCart;
