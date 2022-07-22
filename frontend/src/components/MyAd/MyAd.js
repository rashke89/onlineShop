import React from 'react';
import './MyAd.scss';
import { Link } from "react-router-dom";
import RatingStars from "../RatingStars/RatingStars";

function MyAd({ product }) {

	const generateRatingStar = (product) => {
		const content = [];
		for (let i = 0; i < product.rating; i++) {
			content.push(<RatingStars key={i} />)
		}

		return content
	}


	return (
		<div className="ad-card-wrapper col-md-4 mt-2 mb-3 d-flex  align-items-stretch">
			<div className="card product-card " >
				{/*<div className="product-card-header">*/}
				{/*	/!* Bonus: remove badge after 7 days *!/*/}
				{/*	/!*<span className="badge bg-danger">New</span>*!/*/}
				{/*	<div*/}
				{/*		className={favorite ? "favorite set-favorite" : "favorite"}*/}
				{/*		onClick={() => setFavorite(!favorite)}*/}
				{/*	>*/}
				{/*		{favorite ? (*/}
				{/*			<i className="bi bi-heart-fill"></i>*/}
				{/*		) : (*/}
				{/*			<i className="bi bi-heart"></i>*/}
				{/*		)}*/}
				{/*	</div>*/}
				{/*</div>*/}
				<img
					src={`http://localhost:4000/files/${product.imgUrl}`}
					className="card-img-top img-fluid w-75 mx-auto"
					alt={product.title}
				/>
				<div className="card-body pt-2 px-2 pb-0 d-flex flex-column justify-content-between">
					<h4 className="card-title text-center">{product.title}</h4>
					<p className="text-muted">Category: {product.category}</p>
					<p className="card-text">{product.description}</p>
					<p className="product-rating">
						{generateRatingStar(product)}
					</p>
					<p className="product-price mb-0">
						<sup>$</sup>{product.price}
					</p>
				</div>
				<div className="action-buttons gap-2">
					<Link to={`/product/edit/${product._id}`} className="edit" type="button">
						Edit
						<span>
							<i className="bi bi-pen"></i>
						</span>
					</Link>

					<Link className="delete" type="button" to={`/product/delete/${product._id}`}>
						Delete
						<span>
							<i className="bi bi-trash"></i>
						</span>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default MyAd;
