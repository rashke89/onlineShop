import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./product.scss";
import {routeConfig} from "../../config/routeConfig";


const Product = (props) => {
	const [product, setProduct] = useState({});
	const pathname = window.location.pathname;

	useEffect(() => {
		//props can't change
		setProduct(props.product)
	}, [])

	// const generateRatingStar = (product) => {
	// 	const content = [];
	// 	for (let i = 0; i < product.rating; i++) {
	// 		content.push(<RatingStar key={i}/>)
	// 	}
	//
	// 	return content
	// }

	return (
		<>
			{product.hasOwnProperty("_id") ?
				<div className="product-card-wrapper col-md-4 mt-2 mb-3 d-flex  align-items-stretch">
					<div className="card product-card ">
						<img
							src={product.imgUrl}
							className="card-img-top img-fluid w-75 mx-auto"
							alt={product.title}
						/>
						<div className="card-body pt-2 px-2 pb-0 d-flex flex-column justify-content-between">
							<h4 className="card-title text-center">{product.title}</h4>
							<p className="text-muted">Category: {product.category}</p>
							<p className="card-text">{product.description}</p>
							<p className="product-rating">
								Stars...
							</p>
							<p className="product-price mb-0">
								<sup>$</sup>{product.price}
							</p>
						</div>
						<div className="action-buttons gap-2">
							{pathname === "/shop" ?
								<Link to={routeConfig.SHOP_PRODUCT.fullUrl(product._id)} className="view-more" type="button">
									View more
									<span>
									<i className="bi bi-info-circle"></i>
								</span>
								</Link> :
								<>
									<Link  to={routeConfig.EDIT_PRODUCT.fullUrl(product._id)} className="edit" type="button">
										Edit
										<span>
											<i className="bi bi-pen"></i>
										</span>
									</Link>

									<Link className="delete" type="button" to={routeConfig.DELETE_PRODUCT.fullUrl(product._id)}>
										Delete
										<span>
											<i className="bi bi-trash"></i>
										</span>
									</Link>
								</>
							}
						</div>
					</div>
				</div> : null}
		</>
	)
}

export default Product;