import React from "react";
import logo from './logo.svg';
import './App.css';
import AuthPage from "./pages/authPage";
<<<<<<< HEAD
import Heading from "./pages/heading";
=======
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:4000';
>>>>>>> a53a2d317c6ab8c9201b392e45730a1086edc309

function App() {
  return (
    <div className="main-wrapper">
      <header className="App-header">
<<<<<<< HEAD
        <Heading/>
        <AuthPage/>
=======
         <AuthPage/>
>>>>>>> a53a2d317c6ab8c9201b392e45730a1086edc309
      </header>
    </div>

  );
}

export default App;
