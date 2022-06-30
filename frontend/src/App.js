import './App.css';
import './assets/scss/base.scss';
import AuthPage from "./pages/AuthPage/AuthPage";
import axios from 'axios';
import {Routes, Route, useNavigate} from "react-router-dom";
import Shop from "./pages/Shop/Shop";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Navbar from "./components/Navbar/Navbar";
import {useEffect} from "react";
import Home from './components/Home/Home';
import {useDispatch} from "react-redux";
import {setUser} from "./redux/userSlice";
import ActivateUserPage from "./pages/ActivateUserPage/ActivateUserPage";
import AdPage from "./pages/AdPage/AdPage";
import MyProducts from "./pages/MyProducts/MyProducts";
import AddEditProduct from "./pages/AddEditProduct/AddEditProduct";

axios.defaults.baseURL = 'http://localhost:4000';

function App() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!localStorage.hasOwnProperty('user')) {
			navigate('/auth');
		} else {
			dispatch(setUser(JSON.parse(localStorage.getItem('user'))));
		}
	}, []);

	return (
		<div className="App">

			<Navbar/>
			<Routes>
				<Route path='/' element={<Home/>}/>
				<Route path='/shop' element={<Shop/>}/>
				<Route path='/shop/ad/:adId' element={<AdPage/>}/>
				<Route path='/about-us' element={<About/>}/>
				<Route path='/contact' element={<Contact/>}/>
				<Route path='/auth' element={<AuthPage/>}/>
				<Route path='/user-activate/:id' element={<ActivateUserPage/>}/>
				<Route path='/myProducts' element={<MyProducts/>}/>
				<Route path="/add-product" element={<AddEditProduct/>}/>
				<Route path="/product/edit/:myProductId" element={<AddEditProduct/>}/>
			</Routes>

		</div>
	);
}

export default App;
