import React, {useEffect} from "react";
import {Routes, Route, useNavigate} from "react-router-dom"
import axios from "axios";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AuthPage from "./pages/AuthPage/AuthPage";
import {useDispatch} from "react-redux";
import {setUser} from "./redux/userSlice";
import AddEddProduct from "./pages/AddEddProduct/AddEddProduct";
import MyProducts from "./pages/MyProducts";
import ActivateUserPage from "./pages/ActivateUserPage";
import ProductPage from "./pages/ProductPage";
import DeleteMyProduct from "./pages/DeleteMyProduct/DeleteMyProduct";
import {routeConfig} from "./config/routeConfig";
import AllUsersTEST from "./pages/AllUsersTEST";


//Backend PORT
axios.defaults.baseURL="http://localhost:4000";

function App(){
    const navigate = useNavigate();
    const dispatch=useDispatch()
    //check if user login
 useEffect(()=>{
    if(!localStorage.hasOwnProperty("user")) {
    // navigate('/auth');
    }else {
        dispatch(setUser(JSON.parse(localStorage.getItem("user"))))
    }
 }, [])

    return(

           <Routes>
               <Route path={routeConfig.HOME.url} element={<Home/>}/>
               <Route path={routeConfig.SHOP.url} element={<Shop/>}/>
               <Route path={routeConfig.SHOP_PRODUCT.url} element={<ProductPage/>}/>
               <Route path={routeConfig.ABOUT.url} element={<About/>}/>
               <Route path={routeConfig.CONTACT.url} element={<Contact/>}/>
               <Route path={routeConfig.AUTH.url} element={<AuthPage/>}/>
               <Route path={routeConfig.USER_ACTIVATE.url} element={<ActivateUserPage/>}/>
               <Route path={routeConfig.MY_PRODUCTS.url} element={<MyProducts/>}/>
               <Route path={routeConfig.ADD_PRODUCT.url} element={<AddEddProduct/>}/>
               <Route path={routeConfig.EDIT_PRODUCT.url} element={<AddEddProduct/>}/>
               <Route path={routeConfig.DELETE_PRODUCT.url} element={<DeleteMyProduct/>}/>
               //TEST todo DELETE
               <Route path='/api/users' element={<AllUsersTEST/>}/>
           </Routes>

    )
}

export default App;