import React from 'react';
import OurProductSlider from '../../components/ourProductSlider/ourProductSlider';
// import Slider from "../../components/Slider/Slider";
import Masonry from "../../components/Masonry/Masonry";
import Subscribe from "../../components/Subscribe/Subscribe";
import './home.scss'
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import ClientsWord from "../../components/ClientsWord/ClientsWord";

function Home(props) {
	return (
		<>
			<HomeSlider />

			<div className="container">
				<div className="home-section-wrapper -only-bottom">
					{/*<Slider/>*/}
				</div>
				<div className="home-section-wrapper">
					<Masonry  changeSide={false}/>
				</div> <div className="home-section-wrapper">
				<OurProductSlider/>
			</div>
			</div>

			<div className="home-section-wrapper">
				<Subscribe titleText="save 50% of sale"
									 titleTextBefore="Our Latest Collection"
									 titleTextAfter="Be the first to know about latest and modern furniture"
									 bgUrl="https://quantumalgorithms.ca/sites/default/files/2021-06/Subscribe%20BG.jpg"/>
			</div>

            <div className="container">
                <div className="home-section-wrapper">
                    <ClientsWord/>
                </div>
            </div>

		</>
	);
}

export default Home;
