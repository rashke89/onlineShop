import React, {useEffect} from "react";
import {Routes, Route, useNavigate} from "react-router-dom"
import axios from "axios";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AuthPage from "./pages/AuthPage/AuthPage";

//Backend PORT
axios.defaults.baseURL="http://localhost:4000";

function App(){
    const navigate = useNavigate();

    //check if user login
 // useEffect(()=>{
 //    if(!localStorage.hasOwnProperty("user")) {
 //    navigate('/auth');
 //    }
 // }, [])

    return(

           <Routes>
               <Route path="/" element={<Home/>}/>
               <Route path="/shop" element={<Shop/>}/>
               <Route path="about" element={<About/>}/>
               <Route path="/contact" element={<Contact/>}/>
               <Route path="/auth" element={<AuthPage/>}/>
           </Routes>

    )
}

export default App;