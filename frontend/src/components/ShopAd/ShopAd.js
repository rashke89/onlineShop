import React, {useEffect, useState} from "react";
import "./shopAd.scss";

const ShopAd = (props) => {
	const [ad, setAd] = useState({});
	useEffect(() => {
		console.log(props.ad);
		setAd(props.ad);
	}, []);

	return (
		<div className="shop-ad-wrapper col-md-3">
			{ad.hasOwnProperty("image") &&
				<div>
					<img src={ad.image} className="img img-fluid" alt=""/>
					<p className="shop-ad-title">{ad.title}</p>
					<p>Rate: {ad.rating.rate}</p>
					<p className="shop-ad-price">{ad.price}$</p>
				</div>
			}
		</div>
	);
};

export default ShopAd;