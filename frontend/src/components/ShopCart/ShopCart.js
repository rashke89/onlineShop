import React, {useEffect, useRef, useState} from 'react';
import './shop-cart.scss';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Count from "../Count/Count";
import RemoveCartItem from "../RemoveCartItem/RemoveCartItem";
import {routeConfig} from "../../config/routeConfig";

const ShopCart = ({viewCartItems, setViewCartItems}) => {
	const {cart} = useSelector(state => state.cartStore);
	const shopCartWrapperRef = useRef();

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

	const shopCartItemsLayout = () => {
		return (
			<div className={`cart-sidebar ${viewCartItems ? 'active' : ''}`}>
				<div className="header">
					<h2>Cart items</h2>
					<span onClick={() => setViewCartItems(!viewCartItems)}>
						<i className="bi bi-x"></i>
					</span>
				</div>
				{cart.length > 0 ?
					<div className="go-to-cart my-3">
						<Link to={routeConfig.ORDER.url} className="btn btn-outline-secondary" onClick={() => setViewCartItems(!viewCartItems)}>Order</Link>
					</div> :
					<h3>Cart is empty</h3>
				}
				<div className="cart-sidebar-items">
					{cart.map((item, index) => {
						return <div className="cart-sidebar-item row mt-5" key={index}>
							<div className="col-md-3 img">
								<img src={item.imgUrl} className="img-fluid" alt={item.title}/>
							</div>
							<div className="col-md-6">
								<p>{item.title}</p>
								<p className="price">$ {item.price * item.count}</p>
							</div>
							<div className="col-md-3 col-right">
								{item.count > 1 && <Count item={item} index={index}/>}
								<RemoveCartItem index={index} />
							</div>
						</div>
					})}
				</div>
			</div>
		)
	};

	return (
		<div ref={shopCartWrapperRef} className="shop-cart-wrapper position-relative">
			<i className="bi bi-bag" onClick={() => setViewCartItems(!viewCartItems)}></i>
			<span
				className="position-absolute top-25 start-100 translate-middle badge rounded-pill bg-danger shop-cart-badge">{cart.length}
				<span className="visually-hidden">Shop cart items count</span>
			</span>
			{shopCartItemsLayout()}
		</div>);
}

export default ShopCart;