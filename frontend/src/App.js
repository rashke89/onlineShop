import './App.css';
import './assets/scss/base.scss';
import AuthPage from "./pages/AuthPage/AuthPage";
import axios from 'axios';
import {Routes, Route, useNavigate, Navigate} from "react-router-dom";
import Shop from "./pages/Shop/Shop";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Navigation from "./components/Navigation/Navigation";
import {useEffect, useState} from "react";
import Home from './components/Home/Home';
import {useDispatch, useSelector} from "react-redux";
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
import Loader from "./components/Loader/Loader";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./adminComponents/Users/Users";
import Products from "./adminComponents/Products/Products";
import Stats from "./adminComponents/Stats/Stats";
import NotFound from "./pages/NotFound/NotFound";

axios.defaults.baseURL = 'http://localhost:4000';

function App() {
	const [viewCartItems, setViewCartItems] = useState(false);
	const [isUserCheckFinished, setIsUserCheckFinished] = useState(false);
	const {user} = useSelector(state => state.userStore);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		userLoginHandler();
		shopCartHandler();
	}, []);

	const userLoginHandler = () => {
		if (!localStorage.hasOwnProperty('user')) {
			// navigate(routeConfig.AUTH.url);
		} else {
			dispatch(setUser(JSON.parse(localStorage.getItem('user'))));
		}
		setIsUserCheckFinished(true);
	}

	const shopCartHandler = () => {
		if (localStorage.hasOwnProperty('shopCart')) {
			dispatch(setCart(JSON.parse(localStorage.getItem('shopCart'))));
		}
	}

	const AdminProtect = ({children}) => {
		const {user} = useSelector(state => state.userStore);

		if (user?.isAdmin !== 'true') return <Navigate to={routeConfig.SHOP.url}/>

		return (
			{...children}
		)
	}

	return (
		<div className={`main-wrapper ${viewCartItems ? 'cart-view-opened' : ''}`}>
			<Loader/>
			<Navigation viewCartItems={viewCartItems} setViewCartItems={setViewCartItems}/>
			{isUserCheckFinished &&
				<Routes>
					<Route path="*" element={<NotFound/>}/>
					<Route path={routeConfig.HOME.url} element={<Home/>}/>
					<Route path={routeConfig.SHOP.url} element={<Shop/>}/>
					<Route path={routeConfig.SHOP_PRODUCT.url} element={<ProductPage/>}/>
					<Route path={routeConfig.ABOUT.url} element={<About/>}/>
					<Route path={routeConfig.CONTACT.url} element={<Contact/>}/>
					<Route path={routeConfig.AUTH.url} element={<AuthPage/>}/>
					<Route path={routeConfig.USER_ACTIVATE.url} element={<ActivateUserPage/>}/>
					<Route path={routeConfig.ORDER.url} element={<Order/>}/>

					{user?.username &&
						<>
							<Route path={routeConfig.MY_PRODUCTS.url} element={<MyProducts/>}/>
							<Route path={routeConfig.ADD_PRODUCT.url} element={<AddEditProduct/>}/>
							<Route path={routeConfig.EDIT_PRODUCT.url} element={<AddEditProduct/>}/>
							<Route path={routeConfig.DELETE_PRODUCT.url} element={<DeleteMyProduct/>}/>
						</>
					}

					{/* Admin routes */}
					<Route
						path={routeConfig.DASHBOARD.url}
						element={<AdminProtect><Dashboard/></AdminProtect>}>
						<Route index element={<Stats/>}/>
						<Route path={routeConfig.ADMIN_USERS.url} element={<Users/>}/>
						<Route path={routeConfig.ADMIN_PRODUCTS.url} element={<Products/>}/>
					</Route>
				</Routes>
			}
		</div>
	);
}

export default App;
