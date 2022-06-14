import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";

const Navbar = () => {
	// state - redux store
	const user = useSelector((state) => state.userStore.user);

	useEffect(() => {
		console.log(user);
	}, [user]);

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
						<a className="dropdown-item" href="#">
							<i className="bi bi-card-list me-2"></i>
							My ads
						</a>
					</li>
					<li>
						<hr className="dropdown-divider"/>
					</li>
					<li>
						<a className="dropdown-item" href="#">
							<i className="bi bi-box-arrow-right me-2"></i>
							Logout
						</a>
					</li>
				</ul>
			</li> :
			<li className="nav-item">
				<Link to='/auth' className="nav-link">Login/Register</Link>
			</li>
	}

	return (
		<nav className="navbar navbar-expand-lg bg-light">
			<div className="container-fluid">
				<Link to='/' className="navbar-brand" href="frontend/src/components/Navbar/Navbar#">Navbar</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse"
								data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
								aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
						<li className="nav-item">
							<Link to='/' className="nav-link active" aria-current="page"
										href="frontend/src/components/Navbar/Navbar#">Home</Link>
						</li>
						<li className="nav-item">
							<Link to='/shop' className="nav-link active" aria-current="page"
										href="frontend/src/components/Navbar/Navbar#">Shop</Link>
						</li>
						<li className="nav-item">
							<Link to='/about-us' className="nav-link" href="frontend/src/components/Navbar/Navbar#">About us</Link>
						</li>
						<li className="nav-item">
							<Link to='/contact' className="nav-link">Contact</Link>
						</li>
						{userBtnLayout()}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;