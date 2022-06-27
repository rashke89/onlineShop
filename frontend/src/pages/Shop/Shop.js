import React, {useEffect, useState} from "react";
import ShopService from "../../services/shopService";
import Product from "../../components/Product/Product";

const Shop = (props) => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		ShopService.getProducts()
			.then(res => {
				if (res.status === 200) {
					setProducts(res.data);
				}
			})
			.catch(err => console.log(err));
	}, [])

	return (
		<div className="shop-wrapper container">
			<div className="my-3 d-flex justify-content-end">
				<span className="me-2">Sort by: </span>
				<select>
					<option value="highPrice">Date</option>
					<option value="lowPrice">Low price</option>
					<option value="highPrice">High price</option>
				</select>
			</div>
			<div className="row d-flex justify-content-start flex-wrap">
				{products ?
					products.map(product => {
					return <Product
						product={product} key={product._id}/>
				}) :
					<h4>No products. Try Later</h4>
				}
			</div>
		</div>
	)
}

export default Shop;