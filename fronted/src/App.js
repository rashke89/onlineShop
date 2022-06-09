import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AuthPage from "./pages/authPage";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ShopPage from "./pages/ShopPage";
import AboutUs from "./pages/AboutUs";
import ContactPage from "./pages/ContactPage";

axios.defaults.baseURL = "http://localhost:4000";

function App() {
  return (
    <div className="main-wrapper">
      {/*<header className="App-header">*/}
      {/*   <AuthPage/>*/}
      {/*</header>*/}

      <BrowserRouter>
        <Link to="/shop">Shop</Link>
        <Link to="/about-us">About us</Link>
        <Link to="/contact">Contact</Link>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
