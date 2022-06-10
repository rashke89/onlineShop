import axios from "axios";
import React, { useEffect } from "react";
import AuthPage from "./pages/AuthPage/AuthPage";
import "./assets/scss/base.scss";

import { Routes, Route, useNavigate } from "react-router-dom";
import Shop from "./pages/Shop/Shop";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Navigation from "./components/navigation/Navigation";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home/Home";

export const IsLoggedContext = React.createContext();
axios.defaults.baseURL = "http://localhost:4000";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.hasOwnProperty("user")) {
      navigate("/auth");
    }
  }, []);

  return (
    <div className="main-wrapper">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
