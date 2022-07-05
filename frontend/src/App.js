import './App.css';
import './assets/scss/base.scss';
import AuthPage from "./pages/AuthPage/AuthPage";
import axios from 'axios';
import {Routes, Route, useNavigate} from "react-router-dom";
import Shop from "./pages/Shop/Shop";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Navigation from "./components/Navigation/Navigation";
import {useEffect, useState} from "react";
import Home from './components/Home/Home';
import {useDispatch} from "react-redux";
import {setUser} from "./redux/userSlice";
import {setCart} from "./redux/cartSlice";
import ActivateUserPage from "./pages/ActivateUserPage/ActivateUserPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import MyProducts from "./pages/MyProducts/MyProducts";
import AddEditProduct from "./pages/AddEditProduct/AddEditProduct";
import {routeConfig} from "./config/routeConfig";
import DeleteMyProduct from "./pages/DeleteMyProduct/DeleteMyProduct";
import Order from "./pages/Order/Order";
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = 'http://localhost:4000';

function App() {
	const [viewCartItems, setViewCartItems] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		userLoginHandler();
		shopCartHandler();
	}, []);

	const userLoginHandler = () => {
		if (!localStorage.hasOwnProperty('user')) {
			navigate(routeConfig.AUTH.url);
		} else {
			dispatch(setUser(JSON.parse(localStorage.getItem('user'))));
		}
	}

	const shopCartHandler = () => {
		if(localStorage.hasOwnProperty('shopCart')) {
			dispatch(setCart(JSON.parse(localStorage.getItem('shopCart'))));
		}
	}

	return (
		<div className={`main-wrapper ${viewCartItems ? 'cart-view-opened' : ''}`}>

			<Navigation viewCartItems={viewCartItems} setViewCartItems={setViewCartItems}/>
			<Routes>
				<Route path={routeConfig.HOME.url} element={<Home/>}/>
				<Route path={routeConfig.SHOP.url} element={<Shop/>}/>
				<Route path={routeConfig.SHOP_PRODUCT.url} element={<ProductPage/>}/>
				<Route path={routeConfig.ABOUT.url} element={<About/>}/>
				<Route path={routeConfig.CONTACT.url} element={<Contact/>}/>
				<Route path={routeConfig.AUTH.url} element={<AuthPage/>}/>
				<Route path={routeConfig.USER_ACTIVATE.url} element={<ActivateUserPage/>}/>
				<Route path={routeConfig.MY_PRODUCTS.url} element={<MyProducts/>}/>
				<Route path={routeConfig.ADD_PRODUCT.url} element={<AddEditProduct/>}/>
				<Route path={routeConfig.EDIT_PRODUCT.url} element={<AddEditProduct/>}/>
				<Route path={routeConfig.DELETE_PRODUCT.url} element={<DeleteMyProduct/>}/>
				<Route path={routeConfig.ORDER.url} element={<Order/>}/>
			</Routes>

		</div>
	);
}

export default App;
