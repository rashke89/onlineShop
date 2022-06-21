import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import ShopService from "../../services/shopService";

function MyAds(props) {
	const [products, setProducts] = useState([]);

	const user = JSON.parse(localStorage.getItem("user"))._id;

	useEffect(() => {
		ShopService.getMyAds(user)
			.then(response => {
				if(response.status === 200) {
					setProducts(response.data);
					console.log(response.data);
				}
			})
			.catch(error => {
				console.log(error);
			})
	}, []);

	return (
		<div>
			<h2 className="text-center my-5">My Ads</h2>
			<div className="btn-wrapper d-flex justify-content-center align-items-center">
				<Link to="/add-product" className="btn btn-primary">Add product</Link>
			</div>
			<div className="container">
				<div className="row">
					{products.map((product, index) => {
						return (
							<div className="col-md-3"	key={index}>
								{product?.imgUrl ? <div className="shop-ad-wrapper">
									<div className="shop-ad-content-wrapper">
										<img src={product.imgUrl} className="img img-fluid" alt=""/>
										<p className="shop-ad-title">{product.title}</p>
										<p>Rate: {product.rating}</p>
										<p className="shop-ad-price">{product.price}$</p>
									</div>
								</div> : null}
							</div>
						)
					})}
				</div>

			</div>
		</div>
	);
}

export default MyAds;