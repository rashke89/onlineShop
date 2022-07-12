import React from 'react';
import {useSelector} from "react-redux";
import Count from "../../Count/Count";
import RemoveCartItem from "../../RemoveCartItem/RemoveCartItem";

const OrderProcessStepOne = () => {
	const {cart} = useSelector(state => state.cartStore);

	const emptyCartLayout = () => {
		return !cart.length && <h4 className="my-5">Cart is empty <i className="bi bi-bag-dash"></i></h4>
	}

	return (
		<div className="step-one-wrapper">
			<div className="row header mt-5 text-center">
				<div className="col-md-1">No</div>
				<div className="col-md-7 product">Product</div>
				<div className="col-md-1">Quantity</div>
				<div className="col-md-2">Price</div>
				<div className="col-md-1">Remove</div>
			</div>
			{emptyCartLayout()}
			{cart.map((item, index) => {
				return <div className="row cart-items mt-3" key={index}>
					<div className="col-md-1">{index + 1}</div>
					<div className="col-md-2">
						<img src={item.imgUrl} alt={item.title}/>
					</div>
					<div className="col-md-5 text-start">{item.title}</div>
					<div className="col-md-1">
						<Count item={item} index={index}/>
					</div>
					<div className="col-md-2 price">$ {item.totalPrice}</div>
					<div className="col-md-1">
						<RemoveCartItem index={index}/>
					</div>
					<hr className="text-muted mt-3"/>
				</div>
			})}
		</div>
	);
};

export default OrderProcessStepOne;