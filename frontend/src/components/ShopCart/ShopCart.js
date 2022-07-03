import React, {useEffect, useRef} from 'react';
import './shop-cart.scss';
import {useDispatch, useSelector} from "react-redux";
import {handleCount, removeItem} from "../../redux/cartSlice";

function ShopCart({viewCartItems, setViewCartItems}) {
	const {cart} = useSelector(state => state.cartStore);
	const shopCartWrapperRef = useRef();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!shopCartWrapperRef.current) {
			return;
		}

		// TODO: refactor
		if (cart.length) {
			shopCartWrapperRef.current.classList.add('show-badge');
		} else {
			shopCartWrapperRef.current.classList.remove('show-badge');
		}
	}, [cart]);

	const removeItemFromCart = (index) => {
		dispatch(removeItem(index));
	}

	const handleShopCartCount = (index, isIncrement) => {
		dispatch(handleCount({index, isIncrement}));
	}

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
							<div className="col-md-3 img">
								<img src={item.imgUrl} className="img-fluid" alt={item.title}/>
							</div>
							<div className="col-md-6">
								<p>{item.title}</p>
								<p className="price">$ {item.price * item.count}</p>
							</div>
							<div className="col-md-3 col-right">
								{item.count > 1 &&
									<div className="p-0 count">
										<i className="bi bi-dash"
											 onClick={() => handleShopCartCount(index, false)}>
										</i>
										{item.count && <p className="m-0">{item.count}</p>}
										<i className="bi bi-plus"
											 onClick={() => handleShopCartCount(index, true)}>
										</i>
									</div>
								}
								<i className="bi bi-trash remove"
									 onClick={() => removeItemFromCart(index)}>
								</i>
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