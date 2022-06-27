import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import ShopService from "../../services/shopService";
import MyAd from "../../components/MyAd/MyAd";

function MyAds(props) {
	const [products, setProducts] = useState([]);
	const[sort, setSort]=useState("");
	let sortedAds;

	const user = JSON.parse(localStorage.getItem("user"))._id;

	useEffect(() => {
		ShopService.getMyAds(user)
			.then(response => {
				if(response.status === 200) {

					sortedAds=response.data;


					if(sort==="lowPrice"){
						sortedAds= sortedAds.sort((a, b)=> a.price - b.price);
					}else if(sort==="highPrice"){

						sortedAds= sortedAds.sort((a, b)=> b.price - a.price);
					}
					setProducts(sortedAds)



				}
			})
			.catch(error => {
				console.log(error);
			})
	}, [sort]);

	return (
		<div className="container mt-3">
			<h1>My Products</h1>
			<div className="d-flex justify-content-between m-auto container mt-3 mb-3">
				<Link className="btn btn btn-secondary" to="/add-product">Add product</Link>
				<div><span>Sort by: </span>
					<select onChange={(event)=>{
						setSort(event.target.value);

					}}>

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
