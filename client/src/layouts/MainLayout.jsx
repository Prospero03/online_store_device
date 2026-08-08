import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
    <main className='main-layout'>
        <Header/>
        <Outlet/>
        <Footer/>
    </main>
  )
}

export default MainLayout