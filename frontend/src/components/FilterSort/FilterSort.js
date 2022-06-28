import React, {useState} from 'react';
import './FilterSort.scss';

function FilterSort({setSort, filterStatus, setFilterStatus }) {
	const [ filterPrice, setFilterPrice ] = useState(0);

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
				<div className="search mt-3">
					<form className="d-flex search" role="search">
						<div className="input-group">
							<input className="form-control" type="search" placeholder="Search" aria-label="Search" />
							<button className="btn search-btn" type="submit">Search</button>
						</div>
					</form>
				</div>
				<div className="conditions px-3">
					<div className="row mt-5 price">
						<label for="priceRange" className="form-label">Price: {filterPrice}</label>
						<input type="range" onInput={handleInput} className="form-range" defaultValue="0" min="0" max="10000" id="priceRange" />
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
					Filter
				</button>
				<select className="form-select mx-3 sort" aria-label="Sort" onChange={(event) =>setSort(event.target.value)}>
					<option selected>Sort by:</option>
					<option value="highPrice">High price</option>
					<option value="lowPrice">Low price</option>
				</select>
			</div>
			{filterLayout()}
		</>
	);
}

export default FilterSort;