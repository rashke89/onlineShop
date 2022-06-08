import axios from "axios";
import React from "react";
import AuthPage from "./pages/AuthPage/AuthPage";
import './App.css';

import {BrowserRouter, Routes, Route} from "react-router-dom"
import Shop from "./pages/Shop/Shop";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Navigation from "./components/navigation/Navigation";
import Home from "./pages/Home/Home";

export const IsLoggedContext = React.createContext();
axios.defaults.baseURL = 'http://localhost:4000';

function App() {

    return (
        <div className="main-wrapper">
            {/*<IsLoggedContext.Provider value={setIsLogged}>*/}
            {/*    {!isLogged && <AuthPage/>}*/}
            {/*</IsLoggedContext.Provider>*/}


            <BrowserRouter>
                <Navigation/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/shop" element={<Shop/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/auth" element={<AuthPage/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;
