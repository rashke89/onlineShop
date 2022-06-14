import React, {useEffect, useState} from "react";
import shopService from "../../services/ShopService";
import ShopAd from "../../components/ShopAd/ShopAd";

const Shop = () => {
	const [ads, setAds] = useState([]);

	useEffect(() => {
		shopService.getAds()
			.then(res => {
				console.log(res);
				if (res.status === 200) {
					setAds(res.data);
				}
			})
			.catch(err => {
				console.log(err);
			})
	}, []);

	return (
		<div className="shop-wrapper container">
			<div className="row">
				{ads.map((element, index) => {
					return <ShopAd ad={element} key={index}/>
				})}
			</div>
		</div>
	)
}

export default Shop;