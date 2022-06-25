import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import ShopService from "../../services/shopService";

function ViewAd() {
	const [ad, setAd] = useState({});
	const [isParamsAvailable, setIsParamsAvailable] = useState(true);
	const [isApiFinished, setIsApiFinished] = useState(false);
	const params = useParams();

	useEffect(() => {
		if(params.adId) {
			getAd();
		} else {
			setIsParamsAvailable(false);
		}
	}, []);

	const noParamsMsgLayout = () => {
		return !isParamsAvailable ? <p>No product with this id.</p> : null;
	}

	const adLayout = () => {
		return <div className="ad-wrapper row">
			<div className="col-md-6">
				<img src={ad.image} alt={ad.title}/>
			</div>
			<div className="col-md-6">
				<h3>{ad.title}</h3>
				<p>{ad.category}</p>
				<p>{ad.description}</p>
				<p>{ad.price}</p>

				<button className="btn btn-primary add-to-cart-btn">Add to cart</button>
			</div>
		</div>
	}

	const getAd = () => {
		ShopService.getAdById(params.id)
			.then(response => {
				if(response.status === 200) {
					setAd(response.data);
				}
				if(!response.data) {
					setIsParamsAvailable(false);
				}
			})
			.catch(error => {

			})
			.finally(() => {
				setIsApiFinished(true);
				console.log('product...', ad);
			})
	}

	return (
		<div className="view-ad-wrapper container">
			<div className="row">
				<div className="col-md-12">
					{noParamsMsgLayout()}
					{ad && ad.hasOwnProperty('id') && adLayout()}
				</div>
			</div>
		</div>
	);
}

export default ViewAd;