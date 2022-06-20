import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./shopAd.scss";

const ShopAd = (props) => {
	// state on change
	const [ad, setAd] = useState({});

	// mount
	useEffect(() => {
		setAd(props.ad);
	}, []);

	return (
		<>
			{ad?.image ? <div className="shop-ad-wrapper col-md-3">
				<img src={ad.image} className="img img-fluid" alt=""/>
				<p className="shop-ad-title">{ad.title}</p>
				<p>Rate: {ad.rating.rate}</p>
				<p className="shop-ad-price">{ad.price}$</p>
				<Link to={`/shop/ad/${ad.id}`}>
					<p className="view-more-btn">View Product</p>
				</Link>

			</div> : null}
		</>
	);
};

export default ShopAd;