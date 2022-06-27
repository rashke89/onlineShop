import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import ShopService from "../../services/shopService";
import Product from "../../components/Product/Product";

function MyAds() {
	const [products, setProducts] = useState([]);
	const user = JSON.parse(localStorage.getItem("user"))._id;

	useEffect(() => {
	    ShopService.getMyAds(user)
				.then(res => {
					if(res.status === 200) {
						setProducts(res.data)
					}
				})
				.catch(err => {
					console.log(err);
				})
	}, []);

	return (
		<div className="container mt-3">
			<h1>My products</h1>
			<div className="d-flex justify-content-between m-auto container mt-3 mb-3">
				<Link className="btn btn btn-secondary" to="/add-product">Add product</Link>
				<div><span>Sort by: </span>
					<select>
						<option value="highPrice">Date</option>
						<option value="lowPrice">Low price</option>
						<option value="highPrice">High price</option>
					</select>
				</div>
			</div>
			<div className="row">
				{products.map(product => {
					return <Product product={product} key={product._id} />
				})}
			</div>
		</div>
	);
}

export default MyAds;