import axios from "axios";
import React, {useState} from "react";
import AuthPage from "./pages/AuthPage/AuthPage";
import AllUsers from "./pages/AllUsers/AllUsers.js"
import './App.css';

export const IsLoggedContext = React.createContext();
axios.defaults.baseURL = 'http://localhost:4000';


function App() {
    const [isLogged, setIsLogged] = useState(false);
    return (
        <div className="main-wrapper">
            <IsLoggedContext.Provider value={setIsLogged}>
                {!isLogged && <AuthPage/>}
            </IsLoggedContext.Provider>
            <AllUsers/>
        </div>
    );
}

export default App;
