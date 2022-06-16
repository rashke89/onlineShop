import React from "react";
import { Route, Routes, BrowserRouter} from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AuthPage from "./pages/AuthPage/AuthPage";

//Backend PORT
axios.defaults.baseURL="http://localhost:4000";

const App=()=>{

    return(
       <BrowserRouter>
           <Routes>
               <Route path="/home" element={<Home/>}/>
               <Route path="/shop" element={<Shop/>}/>
               <Route path="about" element={<About/>}/>
               <Route path="/contact" element={<Contact/>}/>
               <Route path="/" element={<AuthPage/>}/>
           </Routes>
       </BrowserRouter>
    )
}

export default App;