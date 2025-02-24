import React from 'react'
import Header from '../partials/Header'
import Footer from '../partials/Footer'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <div className='container-fluid p-0'>
      <Header></Header>
      <div style={{ minHeight: 600 }}>

        <Outlet></Outlet>

      </div>
      <Footer></Footer>
    </div>
  )
}

export default Layout