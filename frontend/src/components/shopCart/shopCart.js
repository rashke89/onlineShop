
import "./shopCart.scss"
import React, {useEffect, useRef} from 'react';
import {FaCartPlus} from "react-icons/fa";
import {useSelector} from "react-redux";

const ShopCart = () => {

    const {cart}=useSelector((state)=>state.cartStore)
    const shopCartWrapperRef=useRef();

    useEffect(() => {
        if(!shopCartWrapperRef.current){
            return
        }
       if(cart.length){
        shopCartWrapperRef.current.classList.add("displayBadge")
       }else{
            shopCartWrapperRef.current.classList.remove("displayBadge")
       }
    }, [cart]);


    return (
        <div ref={shopCartWrapperRef} className="shop-cart-wrapper nav-link  text-light">
        <FaCartPlus/>
            <span className="cartBadge badge rounded-pill bg-warning text-dark">1</span>
            </div>

    );
};

export default ShopCart;
