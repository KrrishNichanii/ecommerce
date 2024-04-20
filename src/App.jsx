import  React , { useState ,useEffect} from "react";
import  ReactDOM from "react-dom/client";
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
import Protected from "./features/auth/components/Protected.jsx";
import { useDispatch, useSelector } from 'react-redux'
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice'
import { checkAuthAsync, selectLoggedInUser } from './features/auth/authSlice'
import OrderSuccess from "./pages/OrderSuccess.jsx";
import UserOrders from "./features/user/components/UserOrders.jsx";
import UserOrder from "./pages/UserOrder.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import { fetchLoggedInUserAsync } from "./features/user/userSlice.js";
import Logout from "./features/auth/components/Logout.jsx";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import AdminProductDetail from "./pages/AdminProductDetail.jsx";
import ForgotPassword from './pages/ForgotPassword.jsx'
import ProductForm from "./pages/AdminProductForm.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { checkAuth } from "./features/auth/authAPI.js";


const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT
};

const router = createBrowserRouter([
  {
    path: "/",
    element:<Protected> <Home/> </Protected> ,
  },
  {
    path: "/admin",
    element: <ProtectedAdmin> <AdminHome/> </ProtectedAdmin> ,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  { 
    path: "/cart",
    element: <Protected> <Cart/> </Protected>,
  },
  { 
    path: "/checkout",
    element:<Protected><Checkout/></Protected> ,
  },
  { 
    path: "/product-detail/:id",
    element:<Protected><ProductDetail/></Protected> , 
  },
  { 
    path: "/admin/product-detail/:id",
    element: <ProtectedAdmin> <AdminProductDetail/></ProtectedAdmin>
  },
  { 
    path: "/admin/product-form",
    element: <ProtectedAdmin> <ProductForm/> </ProtectedAdmin>
  },
  { 
    path: "/admin/orders",
    element: <ProtectedAdmin> <AdminOrders/></ProtectedAdmin>
  },
  { 
    path: "/admin/product-form/edit/:id",
    element: <ProtectedAdmin> <ProductForm/> </ProtectedAdmin>
  },
  { 
    path: "/order-success/:id",
    element:<Protected><OrderSuccess/></Protected> , 
  },
  { 
    path: "/orders",
    element: <UserOrder/>, 
  },
  { 
    path: "/profile",
    element: <UserProfile/>, 
  },
  { 
    path: "/logout",
    element: <Logout/>, 
  },
  { 
    path: "/forgot-password",
    element: <ForgotPassword/>, 
  },
  {
    path: "*",
    element: <Error/>,
  },
]);
function App() {
  
  const dispatch = useDispatch() ; 
  const user = useSelector(selectLoggedInUser)

  // useEffect(() => {
  //   dispatch(checkAuthAsync())
  // })
  useEffect(() => {
    console.log('User which is loaded first ',user);
    if(user){
    dispatch(fetchItemsByUserIdAsync(user.id))
    dispatch(fetchLoggedInUserAsync(user.id));
    }
    //console.log('User in App ' , user);
  } ,[dispatch ,user])
  return (
    <>
    <div >
    <Provider template={AlertTemplate} {...options}>
      <RouterProvider router={router} />
    </Provider>
    </div>
    </>
  )
}

export default App
