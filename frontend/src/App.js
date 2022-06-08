import logo from './logo.svg';
import './App.css';
import AuthPage from "./pages/authPage";
import axios from 'axios';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ShopPage from "./pages/ShopPage";
import AboutUs from "./pages/AboutUs";
import ContactPage from "./pages/ContactPage";
import Navbar from "./components/Navbar";

axios.defaults.baseURL = 'http://localhost:4000';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar/>
				<Routes>
					<Route path='/' element={<AuthPage/>}/>
					<Route path='/shop' element={<ShopPage/>}/>
					<Route path='/about-us' element={<AboutUs/>}/>
					<Route path='/contact' element={<ContactPage/>}/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
