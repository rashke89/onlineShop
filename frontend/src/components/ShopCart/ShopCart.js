import React, {useEffect, useRef} from "react";
import {FaCartPlus, FaMinusCircle, FaPlusCircle, FaTrashAlt} from "react-icons/fa";
import "./shop-cart.scss";
import {useDispatch, useSelector} from "react-redux";
import {removeItem, handleCount} from "../../redux/cartSlice";

function ShopCart() {
    const {cart} = useSelector(state => state.cartStore);
    const shopCartWrapperRef = useRef();
    const dispatch = useDispatch();

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
                    <img src={item.image} alt=""/>
                </div>
                <div className="col-md-8">
                    <h5>{item.title}</h5>

                    {item.count > 1 && <p>Count: <FaMinusCircle className="mx-2" onClick={() => handleShopCartCount(index, false)} /> {item.count}
                    <FaPlusCircle className="mx-2" onClick={() => handleShopCartCount(index, true)}/></p>}

                    <p className="fw-bold">{item.price * item.count} $</p>
                </div>
                <div className="col-md-1 remove-icon-wrapper">
                    <FaTrashAlt onClick={() => {removeItemFromCart(index)}} />
                </div>
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
