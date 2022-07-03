import React from 'react';
import {removeItem} from "../../redux/cartSlice";
import {useDispatch} from "react-redux";

const RemoveCartItem = ({index}) => {
	const dispatch = useDispatch();

	const removeItemFromCart = (index) => {
		dispatch(removeItem(index));
	}
	return (
		<i className="bi bi-trash remove"
			 onClick={() => removeItemFromCart(index)}>
		</i>
	);
};

export default RemoveCartItem;