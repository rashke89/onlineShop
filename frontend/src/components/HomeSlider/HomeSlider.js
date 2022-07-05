import React, {useEffect, useState} from 'react';
import Slide from "./components/Slide";
import ShopService from "../../services/shopService";
import './home-slider.scss';

function HomeSlider() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [randomProducts, setRandomProducts] = useState([]);
	const length = randomProducts.length;

	useEffect(() => {
		setInterval(() => {
			setCurrentSlide(currentSlide === length - 1 ? 0 : currentSlide + 1);
		}, 5000);
	}, [currentSlide]);


	useEffect(() => {
		ShopService.getRandomSliderAds(3)
			.then(response => {
				if(response.status === 200) {
					setRandomProducts(response.data);
					console.log(randomProducts);
				}
			})
			.catch(error => {
				console.log(error);
			})
	}, []);

	return (
		<div className="container-fluid p-0 overflow-hidden">
			<div className="row">
				<div className="col-md-12">
					<div className="slider">
						{randomProducts?.map((product, index) => {
							return <Slide product={product} key={index} index={index} currentSlide={currentSlide}/>
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default HomeSlider;