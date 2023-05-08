import {createRoot} from "react-dom/client";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import {store} from "./store/store.ts";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

const rootElement = document.getElementById('root') as Element | DocumentFragment;

createRoot(rootElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>
);