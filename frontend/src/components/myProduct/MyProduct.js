import React, {useState} from 'react';
import './MyProduct.scss';
import {Link, useNavigate} from "react-router-dom";
import RatingStar from "../ratingStar/RatingStar";

function MyProduct({product}) {
	const [favorite, setFavorite] = useState(false);
	const navigate=useNavigate();

	const generateRatingStar=(product)=>{
		const content=[];
		for (let i = 0; i < product.rating; i++) {
			content.push(<RatingStar/>)
		}

		return content
	}
	return (
		<div className="ad-card-wrapper col-md-4 mt-2 mb-3 d-flex align-items-stretch">
			<div className="card product-card" >
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
					src={product.imgUrl}
					className="card-img-top img-fluid w-75 mx-auto"
					alt={product.title}
				/>
				<div className="card-body pt-2 px-2 pb-0">
					<h4 className="card-title">{product.title}</h4>
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
					<Link  to={`/product/edit/${product._id}`} className="edit" type="button">
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

export default MyProduct;