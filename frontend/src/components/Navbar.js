import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-light">
			<div className="container-fluid">
				<Link to='/' className="navbar-brand" href="#">Navbar</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse"
								data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
								aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
						<li className="nav-item">
							<Link to='/shop' className="nav-link active" aria-current="page" href="#">Shop</Link>
						</li>
						<li className="nav-item">
							<Link to='/about-us' className="nav-link" href="#">About us</Link>
						</li>
						<li className="nav-item">
							<Link to='/contact' className="nav-link">Contact</Link>
						</li>
					</ul>
					<form className="d-flex" role="search">
						<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
						<button className="btn btn-outline-success" type="submit">Search</button>
					</form>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;