import './App.css';
import AuthPage from "./pages/AuthPage";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:4000';

function App() {
    return (
        <div className="main-wrapper">
            <AuthPage/>
        </div>
    );
}

export default App;
