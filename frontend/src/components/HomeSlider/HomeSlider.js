import React, {useEffect, useState} from 'react';
import Slide from "./components/Slide";
import ShopService from "../../services/shopService";
import './home-slider.scss';
import SlideIndicator from "./components/SlideIndicators";

function HomeSlider() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [randomProducts, setRandomProducts] = useState([]);
	const length = randomProducts.length;
	const bgColor = ["#e3f7ff", "#fffaf1", "#eff4ff"];

	useEffect(() => {
		let loop = setInterval(() => {
			setCurrentSlide(currentSlide === length - 1 ? 0 : currentSlide + 1);
		}, 10000);

		return() => {
			clearInterval(loop);
		}
	}, [currentSlide]);


	useEffect(() => {
		ShopService.getRandomSliderAds(3)
			.then(response => {
				if(response.status === 200) {
					setRandomProducts(response.data);
					// console.log(randomProducts);
				}
			})
			.catch(error => {
				console.log(error);
			})
	}, []);

	const changeSlide = (index) => {
		setCurrentSlide(index);
	};

	return (
		<div className="home-slider-wrapper container-fluid p-0 overflow-hidden" style={{ backgroundColor: bgColor[currentSlide] }}>
			<div className="row py-5">
				<div className="col-md-12">
					<div className="slider">
						{randomProducts?.map((product, index) => {
							return <Slide product={product} key={index} index={index} currentSlide={currentSlide}/>
						})}
						<div className="slide-indicators">
							{randomProducts?.map((slide, index) => {
								return (
									<SlideIndicator
										currentSlide={currentSlide}
										index={index}
										key={index}
										changeSlide={changeSlide}
									/>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HomeSlider;