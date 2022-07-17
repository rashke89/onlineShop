import React, {useEffect, useState} from 'react';
import ShopService from "../../services/shopService";
import StatsNumber from "./StatsNumber";
import './stats.scss';

const Stats = () => {
	const [products, setProducts] = useState(0);
	useEffect(() => {
	    ShopService.getProducts()
				.then(res => {
					if(res.status === 200) {
						setProducts(res.data.length);
					}
				})
				.catch(error => {
					console.log(error);
				})
	}, []);
	return (
		<div className="row mt-5">
			<StatsNumber number={products} label="Products"/>
			<StatsNumber number={products} label="Users"/>
		</div>
	);
};

export default Stats;