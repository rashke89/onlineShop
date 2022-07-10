
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {routeConfig} from "../../config/routeConfig";
import ShopCart from "../ShopCart/ShopCart";
import {setUser} from "../../redux/userSlice";


import {
    FaPhoneAlt,
    FaMailBulk,
    FaAngleDown,
    FaLaptopHouse,
    FaSearch,
} from "react-icons/fa";

import './nav-top.scss';




function NavTop(){
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
						<Link to={routeConfig.USER_PROFILE.url} className="dropdown-item user-dropdown">
							{/*TODO: change icons*/}
							{user.isAdmin ? (
								<i className="bi bi-person-workspace me-2"></i>
							) : (
								<i className="bi bi-person-circle me-2"></i>
							)}
							Profile
						</Link>
					</li>
					<li>
						<Link to="/my-ads" className="dropdown-item" href="/">
							<i className="bi bi-card-list me-2"></i>
							My ads
						</Link>
					</li>
					<li onClick={logOut}>
						<Link to="#" className="dropdown-item">
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
        <section className='nav-bar-wrapper'>
            
            <article className='nav-bar-info container'>

                <div className='info-phone'>
                    <a href='/'> <FaPhoneAlt/> &nbsp; <span>Phone: </span> (+1) 123 - 456 - 7890 </a>
                </div>
                
                <div className='info-email-currency'>
                    <div className='email'>
                        <a href='/'> <FaMailBulk/> &nbsp; <span> Email: </span> Info@Ourdomain.Com </a>
                    </div>
                    <div className='currency'> 
                        <p>Currency : USD <FaAngleDown/> </p>
                    </div>
                </div>

                <div className='info-account'>
                    {/* <p>MY ACCOUNT <FaAngleDown/> </p> */}
                    {userBtnLayout()}
                    
                </div>

            </article>
            <hr className='line' />



            <article className='nav-bar-middle container'>


                <div className='middle-logo'>
                    <a href="/">
                        <span> <FaLaptopHouse/> </span>
                        <span>furn</span>
                        <span>home</span>
                    </a>
                </div>

                <div className='middle-search-cart'>

                    <div className='middle-cat'>
                        <a href='/'> Category <FaAngleDown/> </a>
                    </div>

                    <div className='middle-search'>
                        <input type='search' placeholder='Search...' />
                        <a href='/'> <FaSearch/> </a>
                    </div>

                    <div className='middle-cart'>
                        <div className="cart-icon">
                            <ShopCart />
                        </div>
                    </div>

                </div>

            </article>

        </section>
    )

}

export default NavTop;