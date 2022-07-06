import React from "react";
import { Link } from "react-router-dom";
import "./navigation.scss";

function Navigation() {

  return (
	<nav className="main-nav">

		<div className="main-nav-links container">
			<Link className="nav-link"  to="/">
				Home
			</Link>

			<Link className="nav-link" to="/about">
				About
			</Link>

			<Link className="nav-link" to="/shop">
				Shop
			</Link>

			<Link className="nav-link" to="/contact">
				Contact
			</Link>
		</div>
		
	</nav>
  );
}

export default Navigation;
