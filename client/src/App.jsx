import React from 'react'
import "./App.scss"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Home from './pages/Home'
import Login from './pages/Login'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<Home/>}/>
        </Route>
        <Route path="/login" element={<AuthLayout/>}>
          <Route index element={<Login/>}/>
        </Route>
        <Route path="/admin" element={<AdminLayout/>}>
          <Route index element={<Dashboard/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App