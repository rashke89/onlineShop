import React from 'react';
import {handleCount} from "../../redux/cartSlice";
import {useDispatch} from "react-redux";

const Count = ({item, index}) => {
	const dispatch = useDispatch();

	const handleShopCartCount = (index, isIncrement) => {
		dispatch(handleCount({index, isIncrement}));
	}

	return (
		<div className="p-0 count">
			<i className="bi bi-dash"
				 onClick={() => handleShopCartCount(index, false)}>
			</i>
			<p className="m-0">{item.count}</p>
			<i className="bi bi-plus"
				 onClick={() => handleShopCartCount(index, true)}>
			</i>
		</div>
	);
};

export default Count;