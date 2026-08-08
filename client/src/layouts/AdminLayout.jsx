import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <main className='admin-layout'>
        <Outlet/>
    </main>
  )
}

export default AdminLayout