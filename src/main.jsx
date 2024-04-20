import  React from "react";
import  ReactDOM from "react-dom/client";
import App from './App.jsx'
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Cart from "./pages/Cart.jsx";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Checkout from "./pages/Checkout.jsx";
import Error from "./pages/Error.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import { Provider } from "react-redux";
import { store } from './app/store.js'
import Protected from "./features/auth/components/Protected.jsx";





ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store = {store}> 
    
      <App/>
 
    </Provider>
  </React.StrictMode>
);