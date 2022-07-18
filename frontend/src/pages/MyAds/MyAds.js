import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import ShopService from "../../services/shopService";
import MyAd from "../../components/MyAd/MyAd";

function MyAds(props) {
	const [products, setProducts] = useState([]);

	const user = JSON.parse(localStorage.getItem("user"))._id;

	useEffect(() => {
		ShopService.getMyAds(user)
			.then(response => {
				if(response.status === 200) {

					setProducts(response.data);

				}
			})
			.catch(error => {
				console.log(error);
			})
	}, []);

	return (
		<div className="container mt-3">
			<h1>My Products</h1>
			<div className="d-flex justify-content-between m-auto container mt-3 mb-3">
				<Link className="btn btn btn-secondary" to="/add-product">Add product</Link>
				<div><span>Sort by: </span>
					<select>
						<option value="highPrice">Date</option>
						<option value="lowPrice">Low price</option>
						<option value="highPrice">High price</option>
					</select></div>
			</div>
			<div className="row">
				{products.map((product,index)=>{
					return <MyAd product={product} key={index}/>
				})}
			</div>
		</div>
	);
}

export default MyAds;
