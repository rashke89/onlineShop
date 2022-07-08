import React, { useEffect, useState } from "react";
import {NavLink, useNavigate, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import ShopCart from "../ShopCart/ShopCart";
import {routeConfig} from "../../config/routeConfig";
import {setUser} from "../../redux/userSlice";
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


			<Link className="nav-link"  to={routeConfig.HOME.url}>
				Home
			</Link>

			<Link className="nav-link" to={routeConfig.ABOUT.url}>
				About
			</Link>

			<Link className="nav-link" to={routeConfig.SHOP.url}>
				Shop
			</Link>

			<Link className="nav-link" to={routeConfig.CONTACT.url}>
				Contact
			</Link>
		</div>

	</nav>
  );
}

export default Navigation;
