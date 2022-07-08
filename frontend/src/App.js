import '../node_modules/bootstrap/dist/css/bootstrap.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from 'axios';
import Navigation from './components/Navigation.js/Navigation';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Shop from './pages/Shop/Shop';
import Contact from './pages/Contact/Contact';
import Authorization from "./pages/Authorization/Authorization";
import ActivateUser from "./pages/ActivateUser/ActivateUser";
import ProductPage from './pages/ProductPage/ProductPage';
import Order from './pages/Order/Order';
import { setUser } from './redux-store/users/userSlice';
import { setCart } from './redux-store/cart/cartSlice';
import { routeConfig } from './config/routeConfig';
import { localStorageConfig } from './config/localStorageConfig';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader/Loader';

axios.defaults.baseURL = 'http://localhost:4000';
function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    handleUserLogin();
    handleShopCart();
  }, []);


  function handleUserLogin() {
    if (!localStorage.hasOwnProperty(localStorageConfig.USER)) {
      // navigate('/')
    } else {
      dispatch(setUser(JSON.parse(localStorage.getItem(localStorageConfig.USER))));
    }
  }

  function handleShopCart() {
    if (localStorage.hasOwnProperty(localStorageConfig.CART)) {
      dispatch(setCart(JSON.parse(localStorage.getItem(localStorageConfig.CART))));
    }
  }

  return (
    <>
      <Navigation />
      <main>
        <Loader />
        <Routes>
          <Route path={routeConfig.HOME.url} element={<Home />} />
          <Route path={routeConfig.ABOUT.url} element={<About />} />
          <Route path={routeConfig.SHOP.url} element={<Shop />} />
          <Route path={routeConfig.PRODUCT_PAGE.url} element={<ProductPage />} />
          <Route path={routeConfig.CONTACT.url} element={<Contact />} />
          <Route path={routeConfig.AUTORIZATION.url} element={<Authorization />} />
          <Route path={routeConfig.ACTIVATE_USER.url} element={<ActivateUser />} />
          <Route path={routeConfig.ORDER.url} element={<Order />} />
        </Routes>
      </main>
    </>
  )
}

export default App;
