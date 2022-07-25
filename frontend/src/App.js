import axios from "axios";
import React, {useEffect, useState} from "react";
import AuthPage from "./pages/AuthPage/AuthPage";
import './assets/scss/base.scss';

import {Routes, Route, useNavigate} from "react-router-dom"
import Shop from "./pages/Shop/Shop";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Navigation from "./components/navigation/Navigation";
import Home from "./pages/Home/Home";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "./redux/userSlice";
import {setCart} from "./redux/cartSlice";
import ActivateUserPage from "./pages/ActivateUserPage/ActivateUserPage";
import AdPage from "./pages/AdPage/AdPage";
import {routeConfig} from "./config/routeConfig";
import UserProfile from "./pages/userProfile/UserProfile";
import Order from "./pages/order/Order";
import MyAds from "./pages/MyAds/MyAds";
import AddEddProduct from "./pages/AddEddProduct/AddEddProduct";
import DeleteMyAd from "./pages/DeleteMyAd/DeleteMyAd";
import CookiesModal from './components/cookies/CookiesModal'
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/Footer/Footer";
import UnsubscribePage from "./pages/UnsubscribePage/UnsubscribePage";
import Loader from "./components/Loader/Loader";
import Dashboard from "./pages/dashboard/Dashboard";
import {Navigate} from "react-router";

export const IsLoggedContext = React.createContext();
axios.defaults.baseURL = 'http://localhost:4000';

function App() {
    const [filterStatus, setFilterStatus] = useState(false);
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
        <div className={`main-wrapper ${filterStatus ? 'filter-opened' : ''}`}>
            <Loader/>
            {!JSON.parse(localStorage.getItem('cookie')) && <CookiesModal/>}
            <Navigation/>
            <Routes>
                <Route path={routeConfig.HOME.url} element={<Home/>}/>
                <Route path={routeConfig.SHOP.url}
                       element={<Shop filterStatus={filterStatus} setFilterStatus={setFilterStatus}/>}/>
                <Route path={routeConfig.AD_SHOP.url} element={<AdPage/>}/>
                <Route path={routeConfig.ABOUT.url} element={<About/>}/>
                <Route path={routeConfig.CONTACT.url} element={<Contact/>}/>
                <Route path={routeConfig.AUTH.url} element={<AuthPage/>}/>
                <Route path={routeConfig.USER_ACTIVATE.url} element={<ActivateUserPage/>}/>
                <Route path={routeConfig.ORDER.url} element={<Order/>}/>
                <Route path="/my-ads" element={<MyAds/>}/>
                <Route path="/add-product" element={<AddEddProduct/>}/>
                <Route path="/product/edit/:myAdId" element={<AddEddProduct/>}/>
                <Route path="/product/delete/:myAdId" element={<DeleteMyAd/>}/>
                <Route path={routeConfig.USER_PROFILE.url} element={<UserProfile/>}/>
                <Route path={routeConfig.UNSUBSCRIBE.url} element={<UnsubscribePage/>}/>

                {/*admin part*/}
                <Route path={routeConfig.DASHBOARD.url}
                       element={<AdminProtect>
                                    <Dashboard/>
                                </AdminProtect>}>

                </Route>
            </Routes>
            <Footer/>
        </div>
    );
}

function AdminProtect({children}) {
    const {user} = useSelector(state => state.userStore);

    if (user?.isAdmin !== 'true') return <Navigate to={routeConfig.SHOP.url} />
    return (
        {...children}
    )
}

export default App;
