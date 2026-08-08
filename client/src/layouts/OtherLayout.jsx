import React from 'react'
import { Outlet } from 'react-router-dom'

const OtherLayout = () => {
  return (
    <main className='other-layout'>
        <Outlet/>
    </main>
  )
}

export default OtherLayout