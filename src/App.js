import React, { useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import Products from './Components/Products/Products';
import Register from './Components/Register/Register';
import Layout from './Components/Layout/Layout';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Categories from './Components/Category/Categories';
import Brands from './Components/Brands/Brands';
import jwtDecode from 'jwt-decode';
import ProDetails from './Components/ProDetails/ProDetails';
import BrandsDetails from './Components/BrandsDetails/BrandsDetails';
import CategoryDetails from './Components/CategoryDetails/CategoryDetails';
import Wishlist from './Components/Wishlist/Wishlist';
import CheckoutCash from './Components/CheckoutCash/CheckoutCash';
import CheckoutVisa from './Components/CheckoutVisa/CheckoutVisa';
import Allorders from './Components/Allorders/Allorders';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function App() {
  const [userData, setUserData] = useState(null)

  function saveUserData() {
    const userEncodedToken = localStorage.getItem('userToken');
    const userDecodedToken = jwtDecode(userEncodedToken)
    setUserData(userDecodedToken)
  }

  function clearUserData() {
    localStorage.removeItem('userToken')
    setUserData(null)
  }

  const routers = createBrowserRouter([{
    path: '', element: <Layout clearUserData={clearUserData} userData={userData} />, children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute>, },
      { path: 'prodetails/:id', element: <ProtectedRoute><ProDetails /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'CheckoutCash/:id', element: <ProtectedRoute><CheckoutCash /></ProtectedRoute> },
      { path: 'CheckoutVisa/:id', element: <ProtectedRoute><CheckoutVisa /></ProtectedRoute> },
      { path: '/allorders', element: <ProtectedRoute><Allorders userData={userData} /></ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login saveUserData={saveUserData} /> },
      { path: 'logout', element: <Home /> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'categorydetails/:id', element: <ProtectedRoute><CategoryDetails /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'brandDetails/:id', element: <ProtectedRoute><BrandsDetails /></ProtectedRoute> },
      { path: 'forgotPassword', element: <ForgotPassword /> },
      { path: 'resetPassword', element: <ResetPassword /> },
      { path: 'About', element: <About /> },
      { path: '*', element: <Home /> }
    ]
  }])

  useEffect(() => {
    if (localStorage.getItem('userToken') !== null && userData === null) {
      saveUserData()
    }
  }, [])

  return <>
    <Toaster />
    <RouterProvider router={routers}></RouterProvider>
  </>
}
