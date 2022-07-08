import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaTrashAlt, FaPlusCircle, FaMinusCircle, FaCheck, FaInfo } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { localStorageConfig } from '../../config/localStorageConfig';
import { routeConfig } from '../../config/routeConfig';
import { removeItem, handleCount, addedNewFalse, addedOldFalse } from '../../redux-store/cart/cartSlice';
import './ShopCart.scss';

// todo '../ProductCounter'
// todo '../RemoveFromCart'
// ? za sada ne radi
// import ProductCounter from '../../ProductCounter/ProductCounter';
// import RemoveFromCart from '../RemoveFromCart/RemoveFromCart';

function ShopCart() {

    const dispatch = useDispatch();
    const [isShown, setIsShown] = useState(false);
    const { cart } = useSelector(state => state.cartStore);
    const { isAddedNew } = useSelector(state => state.cartStore);
    const { isAddedOld } = useSelector(state => state.cartStore);

    function handleProductCount(index, isIncrease) {
        dispatch(handleCount({ index, isIncrease }));
    }

    // * NOTIFICATIONS FOR ADD AND INCREASE PRODUCT
    useEffect(() => {
        if (isAddedNew) {
            setTimeout(() => {
                dispatch(addedNewFalse());
            }, 2500)
        }
        if (isAddedOld) {
            setTimeout(() => {
                dispatch(addedOldFalse());
            }, 2500)
        }
    }, [isAddedNew, isAddedOld]);

    // TODO - NE RADI LOCAL STORAGE KADA OBRISEM SVE PROIZVODE NA REFRES MI VRACA 1
    // * UPDATING CART IN LOCAL STORAGE
    useEffect(() => {
        if (cart.length) {
            localStorage.setItem(localStorageConfig.CART, JSON.stringify(cart));
        }
    }, [cart]);

    const showCartSumaryLayout = () => {
        return cart.map((item, index) => {
            return (
                <div className="react-index" key={index}>
                    <div className="shop-cart-item">
                        <img src={item.images[0]} alt={item.title} />
                        <div className="content">
                            <div>{item.title}</div>
                            <div className="count">
                                <span>Count:</span>
                                {/* // todo '../ProductCounter'
                                // ? za sada ne radi
                                <ProductCounter /> */}
                                <span><FaMinusCircle onClick={() => handleProductCount(index, false)} /></span>
                                <span>{item.count}</span>
                                <span><FaPlusCircle onClick={() => handleProductCount(index, true)} /></span>
                            </div>
                            <div>Total: ${item.totalPrice}</div>
                        </div>
                        <div className="remove"><FaTrashAlt onClick={() => dispatch(removeItem(index))} /></div>
                        {/* // todo '../RemoveFromCart'
                        // ? za sada ne radi
                        <div className="remove"><RemoveFromCart /></div> */}
                    </div>
                    <div className="shop-cart-item-after"></div>
                </div>
            )
        })
    }

    return (
        <div onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            className="shop-cart-wrapper">
            <Link to={routeConfig.ORDER.url}><FaShoppingCart /></Link>
            <span className="shop-cart-badge">
                {cart.length ? cart.length : null}
            </span>

            {
                isAddedNew &&
                <div className="add-product-message">
                    <FaCheck /> Product is successfully added
                </div>
            }

            {
                isAddedOld &&
                <div className="old-product-message">
                    <FaInfo /> Increased product count
                </div>
            }

            {
                cart.length ?
                    isShown && (
                        <div onMouseEnter={() => setIsShown(true)}
                            onMouseLeave={() => setIsShown(false)}
                            className="shop-cart-summary-wrapper">
                            <div className="shop-cart-items">
                                {showCartSumaryLayout()}
                            </div>
                            <div className="order-btn-wrapper">
                                <button className="btn btn-sm btn-primary"><Link to={routeConfig.ORDER.url}>Go to checkout</Link></button>
                            </div>
                        </div>
                    )
                    : null
            }
        </div>
    )
}

export default ShopCart;
