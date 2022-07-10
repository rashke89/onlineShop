import React, { useEffect, useState } from "react";
import {NavLink, Link} from "react-router-dom";
import {routeConfig} from "../../config/routeConfig";
import "./navigation.scss";

function Navigation() {
	const [isSticky, setIsSticky] = useState(false);

	useEffect(()=>{
		window.addEventListener("scroll", listenToScroll);
	},[])


	const listenToScroll = () => {
		if(window.scrollY > 500){
			setIsSticky("sticky-nav animate__animated animate__backInDown")
		}
		else{
			setIsSticky("")
		}
	}

  return (
	<nav className={"main-nav " + isSticky}>

		<div className="main-nav-links container">
			{isSticky &&
			<Link className="nav-link furn-logo"  to={routeConfig.HOME.url}>
				<span>furn</span>
				<span>home</span>
			</Link>}


			<NavLink className="nav-link"  to={routeConfig.HOME.url}>
				Home
			</NavLink>

			<NavLink className="nav-link" to={routeConfig.ABOUT.url}>
				About
			</NavLink>

			<NavLink className="nav-link" to={routeConfig.SHOP.url}>
				Shop
			</NavLink>

			<NavLink className="nav-link" to={routeConfig.CONTACT.url}>
				Contact
			</NavLink>
		</div>

	</nav>
  );
}

export default Navigation;
