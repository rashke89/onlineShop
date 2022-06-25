import axios from "axios";
import React, {useEffect} from "react";
import AuthPage from "./pages/AuthPage/AuthPage";
import './assets/scss/base.scss';

import {Routes, Route, useNavigate} from "react-router-dom"
import Shop from "./pages/Shop/Shop";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Navigation from "./components/navigation/Navigation";
import Home from "./pages/Home/Home";
import {useDispatch} from "react-redux";
import {setUser} from "./redux/userSlice";
import {setCart} from "./redux/cartSlice";
import ActivateUserPage from "./pages/ActivateUserPage/ActivateUserPage";
import AdPage from "./pages/AdPage/AdPage";
import {routeConfig} from "./config/routeConfig";
import Order from "./pages/order/Order";
import MyAds from "./pages/MyAds/MyAds";
import AddProduct from "./pages/AddProduct/AddProduct";
import EditMyAd from "./pages/EditMyAd/EditMyAd";
import DeleteMyAd from "./pages/DeleteMyAd/DeleteMyAd";

export const IsLoggedContext = React.createContext();
axios.defaults.baseURL = 'http://localhost:4000';

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        handleUserLogin();
        handleShopCart();
    }, []);

    const handleUserLogin = () => {
        if (!localStorage.hasOwnProperty('user')) {
            // navigate('/auth');
        } else {
            dispatch(setUser(JSON.parse(localStorage.getItem('user'))))
        }
    };

    const handleShopCart = () => {
        if (localStorage.hasOwnProperty('shopCart')) {
            dispatch(setCart(JSON.parse(localStorage.getItem('shopCart'))))
        }
    }

    return (
        <div className="main-wrapper">
            <Navigation/>
            <Routes>
                <Route path={routeConfig.HOME.url} element={<Home/>}/>
                <Route path={routeConfig.SHOP.url} element={<Shop/>}/>
                <Route path={routeConfig.AD_SHOP.url} element={<AdPage/>}/>
                <Route path={routeConfig.ABOUT.url} element={<About/>}/>
                <Route path={routeConfig.CONTACT.url} element={<Contact/>}/>
                <Route path={routeConfig.AUTH.url} element={<AuthPage/>}/>
                <Route path={routeConfig.USER_ACTIVATE.url} element={<ActivateUserPage/>}/>
                <Route path={routeConfig.ORDER.url} element={<Order/>}/>
                <Route path="/my-ads" element={<MyAds/>}/>
                <Route path="/add-product" element={<AddProduct/>}/>
                <Route path="/product/edit/:myAdId" element={<EditMyAd/>}/>
                <Route path="/product/delete/:myAdId" element={<DeleteMyAd/>}/>
            </Routes>
        </div>
    );
}

export default App;
