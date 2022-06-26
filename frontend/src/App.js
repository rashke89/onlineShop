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
import EditMyProduct from "./pages/EditMyProduct/EditMyProduct";

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
               <Route path="/" element={<Home/>}/>
               <Route path="/shop" element={<Shop/>}/>
               <Route path="/shop/product/:productId" element={<ProductPage/>}/>
               <Route path="/about" element={<About/>}/>
               <Route path="/contact" element={<Contact/>}/>
               <Route path="/auth" element={<AuthPage/>}/>
               <Route path="/user-activate/:id" element={<ActivateUserPage/>}/>
               <Route path="/myProducts" element={<MyProducts/>}/>
               <Route path="/addProduct" element={<AddEddProduct/>}/>
               <Route path="/product/edit/:myProductId" element={<AddEddProduct/>}/>
               <Route path="/product/delete/:myProductId" element={<DeleteMyProduct/>}/>
           </Routes>

    )
}

export default App;