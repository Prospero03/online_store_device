import React, { useEffect } from 'react'
import "./App.scss"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/authRoute'
import axios from 'axios'
import Profile from './pages/Profile'

const App = () => {
  const server = useSelector((state) => state.prod.link);
  const dispatch = useDispatch()

  useEffect(()=>{
    const fetch = async()=>{
      const res = await axios.get(`${server}/api/user/check-cookie`,{
        withCredentials : true,
      });
      console.log(res)
      if(res.data.message === true){
        dispatch(authActions.login())
      }
    };
    fetch();
  })

  return (
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
        <Route element={<AuthLayout/>}>
          <Route path="/login" element={<Login/>}/>
          <Route path="/sign-up" element={<Signup/>}/>
        </Route>
        <Route path="/admin" element={<AdminLayout/>}>
          <Route index element={<Dashboard/>}/>
        </Route>
      </Routes>
  )
}

export default App