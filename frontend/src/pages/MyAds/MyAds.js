import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import ShopService from "../../services/shopService";
import MyAd from "../../components/MyAd/MyAd";

function MyAds(props) {
	const [favorite, setFavorite] = useState([]);
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
			<div className="btn-wrapper d-flex justify-content-center align-items-center mb-5">
				<Link to="/add-product" className="btn btn-primary">Add product</Link>
			</div>
			<div className="container">
				<div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
					{products.map((product, index) => {
						return(
							<div className="col d-flex align-items-stretch" key={index}>
								{product?.imgUrl ?
									<MyAd product={product} favorite={favorite} setFavorite={setFavorite} /> : null }
							</div>
						)
					})}
				</div>

			</div>
		</div>
	);
}

export default MyAds;