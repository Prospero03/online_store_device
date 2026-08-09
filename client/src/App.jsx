import React from 'react'
import "./App.scss"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<Home/>}/>
        </Route>
        <Route element={<AuthLayout/>}>
          <Route path="/login" element={<Login/>}/>
          <Route path="/sign-up" element={<Signup/>}/>
        </Route>
        <Route path="/admin" element={<AdminLayout/>}>
          <Route index element={<Dashboard/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App