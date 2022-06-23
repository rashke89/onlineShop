import React, {useState} from 'react';
import './MyAd.scss';

function MyAd({product, favorite, setFavorite}) {

	const addFavorite = (product) => {
		setFavorite([...favorite, product]);
	};

	const removeFavorite = (product) => {
		const filtered = favorite.filter((item) => item._id !== product._id);
		setFavorite(filtered);
	};

	const isFavorite = (product) => {
		if (favorite.filter((item) => item._id === product._id).length > 0) {
			return true;
		}
		return false;
	};


	return (
		<div className="ad-card-wrapper container">
			<div className="card product-card">
				<div className="product-card-header">
					{/* Bonus: remove badge after 7 days */}
					<span className="badge bg-danger">New</span>
					<div
						className={isFavorite(product) ? "favorite set-favorite" : "favorite"}
						onClick={() => isFavorite(product) ? removeFavorite(product) : addFavorite(product)}
					>
						{isFavorite(product) ? (
							<i className="bi bi-heart-fill"></i>
						) : (
							<i className="bi bi-heart"></i>
						)}
					</div>
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
					<button className="edit" type="button">
						Edit
						<span>
							<i className="bi bi-pen"></i>
						</span>
					</button>
					<button className="delete" type="button">
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