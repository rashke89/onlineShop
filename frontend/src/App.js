import logo from './logo.svg';
import './App.css';
import AuthPage from "./pages/authPage";
import axios from "axios";

axios.defaults.baseURL='http://localhost:4000';

function App() {
  return (
    <div className="main-wrapper">
      <header className="App-header">

        <AuthPage/>    {/*//auth page login and register user*/}
      </header>
    </div>
  );
}

export default App;
