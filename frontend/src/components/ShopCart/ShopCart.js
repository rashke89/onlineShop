import React, {useEffect, useRef} from "react";
import {FaCartPlus} from "react-icons/fa";
import "./shop-cart.scss";
import {useSelector} from "react-redux";

function ShopCart() {
    const {cart} = useSelector(state => state.cartStore);
    const shopCartWrapperRef = useRef();

    useEffect(() => {
        console.log(cart);
        if (!shopCartWrapperRef.current) {
            return;
        }
        if (cart.length) {
            shopCartWrapperRef.current.classList.add('show-badge');
        } else {
            shopCartWrapperRef.current.classList.remove('show-badge');
        }
    }, [cart]);

    const shopCartSumLayout = () => {
        return cart.map((item, index) => {
            return <div className="shop-cart-item">
                {item.title}
                {item?.count}
            </div>
        })
    }

    return (
        <div ref={shopCartWrapperRef} className="shop-cart-wrapper">
            <FaCartPlus />
            <span className="shop-cart-badge">{cart.length}</span>
            <div className="shop-cart-sum">
                {shopCartSumLayout()}
            </div>
        </div>
    )
}

export default ShopCart;
