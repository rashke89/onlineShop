import React from "react";
import {NavLink, useNavigate, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import ShopCart from "../ShopCart/ShopCart";
import {routeConfig} from "../../config/routeConfig";
import {setUser} from "../../redux/userSlice";

function Navigation() {
	// state - redux store from store.js,
	const {user} = useSelector((state) => state.userStore);
	const navigate=useNavigate();
	const dispatch = useDispatch();
	const logOut=()=>{
		localStorage.removeItem("user");
		dispatch(setUser({}))
		navigate("/auth");
	}

	const userBtnLayout = () => {
		return user.hasOwnProperty("username") ? (
			<li className="nav-item dropdown">
				<a
					className="nav-link dropdown-toggle"
					href="/"
					id="navbarDropdown"
					role="button"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					{user.username}
				</a>
				<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
					<li>
						<NavLink to={routeConfig.USER_PROFILE.url} className="dropdown-item user-dropdown">
							{/*TODO: change icons*/}
							{user.isAdmin ? (
								<i className="bi bi-person-workspace me-2"></i>
							) : (
								<i className="bi bi-person-circle me-2"></i>
							)}
							Profile
						</NavLink>
					</li>
					<li>
						<NavLink to="/my-ads" className="dropdown-item" href="/">
							<i className="bi bi-card-list me-2"></i>
							My ads
						</NavLink>
					</li>
					<li onClick={logOut}>
						<NavLink to="#" className="dropdown-item">
							<i className="bi bi-box-arrow-right me-2"></i>
							Logout
						</NavLink>
					</li>
				</ul>
			</li>
		) : (
			<li className="nav-item">
				<Link to="/auth" className="nav-link">
					Login/Register
				</Link>
			</li>
		);
	};
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container">
				<Link className="navbar-brand" to="/">E-Shop</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarText"
					aria-controls="navbarText"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarText">
					<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/about">About</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/shop">Shop</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/contact">Contact</NavLink>
						</li>
                        <li className="nav-item">
                            <ShopCart />
                        </li>
						{userBtnLayout()}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navigation;
