import React, {useEffect, useRef} from 'react';
import './shop-cart.scss';
import {useSelector} from "react-redux";

function ShopCart({viewCartItems, setViewCartItems}) {
	const {cart} = useSelector(state => state.cartStore);
	const shopCartWrapperRef = useRef();

	useEffect(() => {
		if (!shopCartWrapperRef.current) {
			return;
		}

		// TODO: refactor
		if (cart.length) {
			shopCartWrapperRef.current.classList.add('show-badge');
		} else {
			shopCartWrapperRef.current.classList.add('remove-badge');
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
				<div className="cart-sidebar-items">
					{cart.map((item, index) => {
						return <div className="cart-sidebar-item row mt-5" key={index}>
										<div className="col-md-4">Img</div>
										<div className="col-md-6">
											<p>{item.title}</p>
											<span>{item?.count}</span>
										</div>
										<div className="col-md-2">Sum</div>
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