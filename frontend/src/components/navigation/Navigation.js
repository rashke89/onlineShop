import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

function Navigation() {
	// state - redux store from store.js,
	// const user = useSelector((state) => state.userStore.user);
	const {user} = useSelector((state) => state.userStore);


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
						<a className="dropdown-item user-dropdown" href="/">
							{/*TODO: change icons*/}
							{user.isAdmin ? (
								<i className="bi bi-person-workspace me-2"></i>
							) : (
								<i className="bi bi-person-circle me-2"></i>
							)}
							Profile
						</a>
					</li>
					<li>
						<Link to="/my-ads" className="dropdown-item" href="/">
							<i className="bi bi-card-list me-2"></i>
							My ads
						</Link>
					</li>
					<li>
						<Link to="/logout" className="dropdown-item">
							<i className="bi bi-box-arrow-right me-2"></i>
							Logout
						</Link>
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
							<Link className="nav-link active" aria-current="page" to="/">Home</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/about">About</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/shop">Shop</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/contact">Contact</Link>
						</li>
						{userBtnLayout()}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navigation;
