import React from "react";
import {createRoot} from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css"
import App from "./App";
import {BrowserRouter, Router} from "react-router-dom";



const root=createRoot(document.getElementById('root'));
root.render(

<React.StrictMode>
        <BrowserRouter>
                <App/>
        </BrowserRouter>
</React.StrictMode>
)
