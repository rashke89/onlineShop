import React, {useEffect} from 'react';
import './FilterSort.scss';
import {useSelector} from "react-redux";




	function FilterSort({setSort, filterStatus, setFilterStatus, filterPrice, setFilterPrice, setSearchTerm, searchTerm,setItemsPerPage}) {

		const {symbol} = useSelector(state=>state.currencyStore);
		const handleSearch = e => {
			setSearchTerm(e.target.value);
		}

		const handleInput = e => {
			setFilterPrice(e.target.value);
		}

		const filterLayout = () => {
			return (
				<div className={`filter ${filterStatus ? 'filter-active' : ''}`}>
					<div className="header">
						<h2>Filter</h2>
						<span onClick={() => setFilterStatus(!filterStatus)}>
            <i className="bi bi-x"></i>
          </span>
					</div>
					<div className="conditions px-3">
						<div className="row mt-5 price">
							<label htmlFor="priceRange" className="form-label">Price: {filterPrice} {symbol}</label>
							<input type="range" onInput={handleInput} className="form-range" defaultValue="0" min="0"
								   max="1000" step="1" id="priceRange"/>
						</div>

					</div>
				</div>
			);
		};


		return (
			<>
				<div className="d-flex justify-content-start container my-5">
					<button className="btn filter-btn" onClick={() => setFilterStatus(!filterStatus)}>
						Filter
					</button>
					<div className="search mx-3">
						<form className="d-flex search h-100" role="search">
							<div className="input-group">
								<input className="form-control"
									   type="search"
									   defaultValue={searchTerm}
									   placeholder="Search"
									   aria-label="Search"
									   onChange={handleSearch}/>
							</div>
						</form>
					</div>
					<select className="form-select sort" defaultValue="" aria-label="Sort"
							onChange={(event) => {setSort(event.target.value)}}>
						<option value="lowPrice">Low price</option>
						<option value="highPrice">High price</option>
					</select>
				</div>
				{filterLayout()}
			</>
		);

}
export default FilterSort;
