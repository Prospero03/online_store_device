import React from 'react'
import "./App.scss"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import OtherLayout from './layouts/OtherLayout'
import AdminLayout from './layouts/AdminLayout'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/admin/Dashboard'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<Home/>}/>
        </Route>
        <Route path="/auth" element={<OtherLayout/>}>
          <Route index element={<Auth/>}/>
        </Route>
        <Route path="/admin" element={<AdminLayout/>}>
          <Route index element={<Dashboard/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App