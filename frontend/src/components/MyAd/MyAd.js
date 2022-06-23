import React from 'react';
import './MyAd.scss';
import {Link, useNavigate} from "react-router-dom";
import ShopService from "../../services/shopService";




function MyAd({product}) {

	const navigate=useNavigate()
	const deleteMyAd=(myAddId)=>{
		ShopService.deleteMyAd(myAddId)
			.then((response)=>{


			})
			.catch((error)=>{
				console.log(error);
			})
	}

	return (
		<div className="ad-card-wrapper container">
			<div className="card product-card">
				<div className="product-card-header">
					{/* Bonus: remove badge after 7 days */}
					<span className="badge bg-danger">New</span>
				</div>
				<img
					src={product.imgUrl}
					className="card-img-top img-fluid"
					alt={product.title}
				/>
				<div className="card-body pt-2 px-2 pb-0">
					<h4 className="card-title">{product.title}</h4>
					<p className="text-muted">Category</p>
					<p className="card-text">{product.description}</p>
					<p className="product-rating">
						{/* TODO: conditionaly render stars */}
						<i className="bi bi-star me-1"></i>
						<i className="bi bi-star me-1"></i>
						<i className="bi bi-star me-1"></i>
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
					<button className="delete" type="button" onClick={()=>deleteMyAd(product._id)}>
						Delete
						<span>
							<i className="bi bi-trash"></i>
						</span>
					</button>
				</div>
			</div>
		</div>
	);
}

export default MyAd;