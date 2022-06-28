import "./shopCart.scss"
import React, {useEffect, useRef, useState} from 'react';
import {FaCartPlus, FaMinusCircle, FaPlusCircle} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {handleCount, removeItem} from "../../redux/cartSlice";


const ShopCart = () => {

    const {cart} = useSelector((state) => state.cartStore)
    const shopCartWrapperRef = useRef();
    const [isCart, setIsCart] = useState(false);
    const cartSummary = useRef();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!shopCartWrapperRef.current) {
            return
        }

        if (cart.length) {
            setIsCart(true)


        } else {
            setIsCart(false)

        }
    }, [cart]);

    const displayCartSummary = () => {
        cartSummary.current.classList.toggle("displayCartSummary")
    }

    const removeItemFromCart = (index) => {
        dispatch(removeItem(index));
    }

    const handleShopCartCount = (index, isIncrement) => {

        dispatch(handleCount({index,isIncrement}))
    }


    return (
        <div className="nav-item">
            <div ref={shopCartWrapperRef} className="shop-cart-wrapper nav-link  text-light" onClick={() => {
                displayCartSummary()
            }}>
                <FaCartPlus/>
                <span
                    className={`${isCart ? "displayBadge" : null} cartBadge badge rounded-pill bg-warning text-dark`}>{cart.length}</span>
                <div ref={cartSummary} className="shop-cart-summary container text-dark p-2 ">
                    {cart.map((product, index) => {

                        return <div className="shop-cart-item row" key={index}>

                            <div className="col-5">
                                <img src={product.imgUrl} alt=""/>
                            </div>
                            <div className="col-5">
                                <h6 className="text-center">{product.title}</h6>
                                {product.count>1 &&
                                    <p>
                                        Count: <FaMinusCircle onClick={() => {
                                        handleShopCartCount(index, false)
                                    }}/><span
                                        className="shop-item-count mx-2">{product.count}</span><FaPlusCircle
                                        onClick={() => {
                                            handleShopCartCount(index, true)
                                        }}/>
                                    </p>}
                                <p className=""> Total: <span
                                    className="shop-item-total-price"><sup>$</sup>{product.price * product.count}</span>
                                </p>
                            </div>
                            <div className="shop-cart-delete-item col-2 text-center"
                                 onClick={() => {
                                     removeItemFromCart(index)
                                 }}>
                                <i className="bi bi-trash-fill"></i>
                            </div>


                        </div>
                    })

                    }
                    <div className="row text-center">
                        <div className="col-6 m-auto">
                            {cart.length ? <button className="btn btn-secondary m-auto">Go to shopCart</button> :
                                <p>No products</p>}

                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default ShopCart;
