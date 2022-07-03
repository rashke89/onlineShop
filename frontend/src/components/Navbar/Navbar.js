import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import ShopCart from "../ShopCart/ShopCart";
import {routeConfig} from "../../config/routeConfig";

const Navbar = ({viewCartItems, setViewCartItems}) => {
	// state - redux store
	const user = useSelector((state) => state.userStore.user);
	const navigate = useNavigate();

	const logout = () => {
		localStorage.clear();
		navigate(routeConfig.AUTH.url);
	}

	const userBtnLayout = () => {
		return user.hasOwnProperty('username') ?
			<li className="nav-item dropdown">
				<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
					 aria-expanded="false">
					{user.username}
				</a>
				<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
					<li>
						<a className="dropdown-item user-dropdown" href="#">
							{/*TODO: change icons*/}
							{user.isAdmin ?
								<i className="bi bi-person-workspace me-2"></i> :
								<i className="bi bi-person-circle me-2"></i>
							}
							Profile
						</a>
					</li>
					<li>
						<Link to={routeConfig.MY_PRODUCTS.url} className="dropdown-item" href="#">
							<i className="bi bi-card-list me-2"></i>
							My products
						</Link>
					</li>
					<li>
						<hr className="dropdown-divider"/>
					</li>
					<li>
						<a className="dropdown-item" href="#" onClick={logout}>
							<i className="bi bi-box-arrow-right me-2"></i>
							Logout
						</a>
					</li>
				</ul>
			</li> :
			<li className="nav-item">
				<Link to={routeConfig.AUTH.url} className="nav-link">Login/Register</Link>
			</li>
	}

	return (
		<nav className="navbar navbar-expand-md bg-light">
			<div className="container-fluid">
				<Link to={routeConfig.HOME.url} className="navbar-brand" href="frontend/src/components/Navbar/Navbar#">Navbar</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse"
								data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
								aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto align-items-center">
						<li className="nav-item">
							<Link to={routeConfig.HOME.url} className="nav-link active" aria-current="page">Home</Link>
						</li>
						<li className="nav-item">
							<Link to={routeConfig.SHOP.url} className="nav-link active" aria-current="page">Shop</Link>
						</li>
						<li className="nav-item">
							<Link to={routeConfig.ABOUT.url} className="nav-link">About us</Link>
						</li>
						<li className="nav-item">
							<Link to={routeConfig.CONTACT.url} className="nav-link">Contact</Link>
						</li>
						<li className="nav-item">
							<ShopCart viewCartItems={viewCartItems} setViewCartItems={setViewCartItems} />
						</li>
						{userBtnLayout()}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;