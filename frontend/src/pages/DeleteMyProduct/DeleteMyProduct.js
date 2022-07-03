import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import ShopService from "../../services/shopService";
import {routeConfig} from "../../config/routeConfig";

const DeleteMyProduct = () => {
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
	    let myProductId = params.myProductId;
			ShopService.deleteMyProduct(myProductId)
				.then(res => {
					navigate(routeConfig.MY_PRODUCTS.url);
				})
				.catch(err => {
					console.log(err);
				})
	}, []);
	return (
		<div></div>
	);
}

export default DeleteMyProduct;