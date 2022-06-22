import React from 'react';
import {Link} from "react-router-dom";

function MyAds(props) {


	return (
		<div>
			<h2 className="text-center my-5">My Ads</h2>
			<div className="btn-wrapper d-flex justify-content-center align-items-center">
				<Link to="/add-product" className="btn btn-primary">Add product</Link>
			</div>
			<div className="container">
				<div className="row">

				</div>

			</div>
		</div>
	);
}

export default MyAds;