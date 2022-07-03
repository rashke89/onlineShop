import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import ShopService from "../../services/shopService";
import {useDispatch} from "react-redux";
import {addToCart} from "../../redux/cartSlice";

function ViewProduct() {
	const [product, setProduct] = useState({});
	const [isParamsAvailable, setIsParamsAvailable] = useState(true);
	const [isApiFinished, setIsApiFinished] = useState(false);
	const params = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		if(params.productId) {
			getProduct();
		} else {
			setIsParamsAvailable(false);
		}
	}, []);

	const noParamsMsgLayout = () => {
		return !isParamsAvailable ? <p>Product not found. </p> : null;
	}

	const addToCartHandler = () => {
		dispatch(addToCart(product));
	}

	const productLayout = () => {
		return <div className="product-wrapper row mt-5">
			<div className="col-md-6">
				<img src={product.imgUrl} alt={product.title} className="img-fluid"/>
			</div>
			<div className="col-md-6">
				<h3>{product.title}</h3>
				<p>{product.category}</p>
				<p>{product.description}</p>
				<p className="fw-bold">$ {product.price}</p>

				<button className="btn btn-primary add-to-cart-btn" onClick={addToCartHandler}>Add to cart</button>
			</div>
		</div>
	}

	const getProduct = () => {
		ShopService.getProductById(params.productId)
			.then(response => {
				if(response.status === 200) {
					setProduct(response.data);
				}
				if(!response.data) {
					setIsParamsAvailable(false);
				}
			})
			.catch(error => {
				console.log(error);
			})
			.finally(() => {
				setIsApiFinished(true);
			})
	}

	return (
		<div className="view-ad-wrapper container">
			<div className="row">
				<div className="col-md-12">
					{noParamsMsgLayout()}
					{product && product.hasOwnProperty('_id') && productLayout()}
				</div>
			</div>
		</div>
	);
}

export default ViewProduct;