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
import ActivateUserPage from "./pages/ActivateUserPage/ActivateUserPage";
import AdPage from "./pages/AdPage/AdPage";
import MyAds from "./pages/MyAds/MyAds";
import AddProduct from "./pages/AddProduct/AddProduct";
import EditMyAd from "./pages/EditMyAd/EditMyAd";

export const IsLoggedContext = React.createContext();
axios.defaults.baseURL = 'http://localhost:4000';

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!localStorage.hasOwnProperty('user')) {
            // navigate('/auth');
        } else {
            dispatch(setUser(JSON.parse(localStorage.getItem('user'))))
        }
    }, []);

    return (
        <div className="main-wrapper">
            <Navigation/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/shop" element={<Shop/>}/>
                <Route path="/shop/ad/:adId" element={<AdPage/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/auth" element={<AuthPage/>}/>
                <Route path="/user-activate/:id" element={<ActivateUserPage/>}/>
                <Route path="/my-ads" element={<MyAds/>}/>
                <Route path="/add-product" element={<AddProduct/>}/>
                <Route path="/product/edit/:myAdId" element={<EditMyAd/>}/>
            </Routes>
        </div>
    );
}

export default App;
