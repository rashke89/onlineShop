
import './App.css';
import axios from "axios";
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import AuthPage from "./pages/authPage";
import ShopPage from "./pages/ShopPage";
import AboutUs from "./pages/AboutUs";
import ContactPage from "./pages/ContactPage";

axios.defaults.baseURL="http://localhost:4000";


function App() {
  return (
      <div>


      <BrowserRouter>
        <Link to="/shop">Shop</Link>
        <Link to="/about-us">AboutUS</Link>
        <Link to="/contact">Contact</Link>
        <Routes>
          <Route>
            path="/" element={<AuthPage/>}
          </Route>
          <Route>
            path="/shop" element={<ShopPage/>}
          </Route>
          <Route>
            path="/about-us" element={<AboutUs/>}
          </Route>
          <Route>
            path="/contact" element={<ContactPage/>}
          </Route>
        </Routes>
        <AuthPage/>
      </BrowserRouter>
      </div>

  );
}

export default App;
