import React, {useEffect, useRef, useState} from "react";
import {FaCartPlus, FaMinusCircle, FaPlusCircle, FaTrashAlt} from "react-icons/fa";
import "./shop-cart.scss";
import {useDispatch, useSelector} from "react-redux";
import {removeItem, handleCount} from "../../redux/cartSlice";
import {routeConfig} from "../../config/routeConfig";
import {useNavigate} from "react-router-dom";
import ChangeCurrency from "../ChangeCurrency/ChangeCurrency";

function ShopCart() {
    const {cart} = useSelector(state => state.cartStore);
    const shopCartWrapperRef = useRef();
    const [showCartByClick, setShowCartByClick] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!shopCartWrapperRef.current) {
            return;
        }
        if (cart.length) {
            shopCartWrapperRef.current.classList.add('show-badge');
            localStorage.setItem('shopCart', JSON.stringify(cart));
        } else {
            shopCartWrapperRef.current.classList.remove('show-badge');
        }
    }, [cart]);

    const removeItemFromCart = (index) => {
        dispatch(removeItem(index))
    };

    const handleShopCartCount = (index, isIncrement) => {
        dispatch(handleCount({index, isIncrement}))
    };

    const shopCartSumLayout = () => {
        return cart.map((item, index) => {
            return <div className="shop-cart-item row mt-3" key={index}>
                <div className="col-md-3">
                    <img src={item.imgUrl} alt=""/>
                </div>
                <div className="col-md-8">
                    <h5>{item.title}</h5>

                    {item.count > 1 && <p>Count: <FaMinusCircle className="mx-2" onClick={() => handleShopCartCount(index, false)} /> {item.count}
                    <FaPlusCircle className="mx-2" onClick={() => handleShopCartCount(index, true)}/></p>}

                    <p className="fw-bold">
                        <ChangeCurrency adConvertPrice={item.totalPrice} />
                    </p>
                </div>
                <div className="col-md-1 remove-icon-wrapper">
                    <FaTrashAlt onClick={() => {removeItemFromCart(index)}} />
                </div>
            </div>
        })
    }

    const handleShowCart = () => {
        setShowCartByClick(!showCartByClick);
    };

    const goToOrder = () => {
        setShowCartByClick(false);
        navigate(routeConfig.ORDER.url)
    }

    return (
        <div ref={shopCartWrapperRef} className="shop-cart-wrapper">
            <FaCartPlus onClick={e => handleShowCart()} className="fa-cart-icon" />
            <span className="shop-cart-badge">{cart.length}</span>
            {
                showCartByClick &&
                (
                    <div className="shop-cart-sum">
                        <div className="items-wrapper">
                            {shopCartSumLayout()}
                        </div>
                        <div className="order-btn-wrapper">
                                <button className="btn btn-primary" onClick={e => goToOrder()}>Order Now</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ShopCart;
