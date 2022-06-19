import React from "react";
import {createRoot} from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css"
import App from "./App";
import {BrowserRouter, Router} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store";
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';


const root=createRoot(document.getElementById('root'));
root.render(

<React.StrictMode>
        <BrowserRouter>
                <Provider store={store}>
                <App/>
                </Provider>
        </BrowserRouter>
</React.StrictMode>
)
