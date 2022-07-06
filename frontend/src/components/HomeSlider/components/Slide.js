import React from 'react';
import {Link} from "react-router-dom";

function Slide({product, index, currentSlide}) {
	return (
		<div className={index === currentSlide ? "slide active" : "slide"}>
			{index === currentSlide &&
				<>
					<h3 className="slide-title animate__animated animate__slideInLeft">{product.title}</h3>
					<p className="slide-description animate__animated animate__slideInRight">{product.description}</p>
					<Link to={`/shop/ad/${product._id}`} className="slider-cta-button animate__animated animate__fadeInUp">Shop now</Link>
					<img src={product.imgUrl} alt={product.title} className="slide-img img-fluid animate__animated animate__fadeInTopRight"/>
				</>
			}
		</div>
	);
}

export default Slide;