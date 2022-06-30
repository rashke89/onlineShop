import React, {useState} from 'react';
import './FilterSort.scss';

function FilterSort({setSort, filterStatus, setFilterStatus, filterPrice, setFilterPrice, setSearchTerm}) {

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
						<label htmlFor="priceRange" className="form-label">Price: {filterPrice}</label>
						<input type="range" onInput={handleInput} className="form-range" defaultValue="0" min="0" max="1000" step="1" id="priceRange" />
					</div>
					{/* <div class="row g-2">
            <h4 className="mt-5">Price</h4>
            <div class="col-sm">
              <div class="form-floating">
                <input type="number" class="form-control" id="minPrice" placeholder="Min" />
                <label for="minPrice">Min</label>
              </div>
            </div>
            <div class="col-sm">
              <div class="form-floating">
                <input type="number" class="form-control" id="maxPrice" placeholder="Max" />
                <label for="maxPrice">Max</label>
              </div>
            </div>
          </div> */}
				</div>
			</div>
		);
	};
	return (
		<>
			<div className="d-flex justify-content-start container my-5">
				<button className="btn filter-btn" onClick={() => setFilterStatus(!filterStatus)}>
					<i className="bi bi-funnel me-2"></i>
					Filter
				</button>
				<div className="search mx-3">
					<form className="d-flex search h-100" role="search">
						<div className="input-group">
							<input className="form-control" type="search" placeholder="Search" aria-label="Search..." onChange={handleSearch} />
						</div>
					</form>
				</div>
				<select className="form-select sort" defaultValue="Sort by:" aria-label="Sort" onChange={(event) =>setSort(event.target.value)}>
					<option>Sort by:</option>
					<option value="highPrice">High price</option>
					<option value="lowPrice">Low price</option>
				</select>
			</div>
			{filterLayout()}
		</>
	);
}

export default FilterSort;