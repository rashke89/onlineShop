import React, {useEffect, useState} from 'react';
import shopService from '../../services/shopService';
import ShopAd from "../../components/ShopAd/ShopAd";
import './shop.scss';
import FilterSort from "../../components/FilterSort/FilterSort";

function Shop({filterStatus, setFilterStatus}) {
	const [ads, setAds] =useState([]);
	const [ filterPrice, setFilterPrice ] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");
	const[sort, setSort]=useState("");
	let sortedAds;
	let filteredAds;
	let searchedAds;

	// Sort
	useEffect(() => {
		shopService.getAds()
			.then((res) => {
				if (res.status === 200)

					sortedAds=res.data;


				if(sort==="lowPrice"){
					sortedAds= sortedAds.sort((a, b)=> a.price - b.price);
				}else if(sort==="highPrice"){

					sortedAds= sortedAds.sort((a, b)=> b.price - a.price);
				}
				setAds(sortedAds)

				setAds(sortedAds);

			})
			.catch(err => console.log(err));
	}, [sort]);

	// Filter
	useEffect(() => {
		shopService.getAds()
			.then(res => {
				if(res.status === 200) {
					filteredAds = res.data;
				}

				if(filterPrice > 0) {
					filteredAds = filteredAds.filter(ad => { return ad.price < parseInt(filterPrice, 10) })
				}
				setAds(filteredAds);
			})
			.catch(err => console.log(err))
	}, [filterPrice]);

	// Search
	useEffect(() => {
		shopService.getAds()
			.then(res => {
				if(res.status === 200) {
					searchedAds = res.data;
				}

				if(searchTerm) {
					searchedAds = searchedAds.filter(ad => { return ad.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1})
				}
				setAds(searchedAds);

			})
			.catch(err => console.log(err))
	}, [searchTerm]);

	return (
		<div className="shop-wrapper container">
			<div className="row">
				<FilterSort setSort={setSort} filterStatus={filterStatus} setFilterStatus={setFilterStatus} filterPrice={filterPrice} setFilterPrice={setFilterPrice} setSearchTerm={setSearchTerm} />
			</div>
			{/*<div className="shopNav d-flex justify-content-end m-auto container mt-3">*/}

			{/*	<div><span>Sort by: </span>*/}
			{/*		<select  onChange={(event)=>{*/}
			{/*			setSort(event.target.value);*/}

			{/*		}}>*/}
			{/*			<option value="lowPrice">Low price</option>*/}
			{/*			<option value="highPrice">High price</option>*/}
			{/*		</select></div>*/}
			{/*</div>*/}
			<div className="row">
				{ads.map((element) => {
					return <ShopAd ad={element} key={element._id}/>
				})}
			</div>
		</div>
	);
}

export default Shop;
