import React from 'react'
import { Routes,Route,Navigate,Outlet } from 'react-router-dom'
import Home from '../pages/Home'
import AdminLogin from '../pages/AdminLogin'
import AdminHome from '../pages/AdminHome'
import AddNewsPage from '../pages/AddNewsPage'
const Navigation = () => {

  const PrivateWrapper = () => {
    const token = localStorage.getItem('token');
    if(!token){
      return <Navigate to="/" />
    }
    else{
      return <Outlet />
    }
  }
  const PrivateWrapper2 = () => {
    const token = localStorage.getItem('token');
    if(token){
      return <Navigate to="/admin-home" />
    }
    else{
      return <Outlet />
    }
  }

  return (
    <>
      <Routes>
          <Route element={ <PrivateWrapper2 /> }>
            <Route path='/' element={ <Home user={'CUSTOMER'} /> } />
            <Route path='/admin-login' element={ <AdminLogin /> } />
          </Route>
          <Route element={ <PrivateWrapper /> }>
            <Route path='/add-news' element={ <AddNewsPage /> } />
            <Route path='/admin-home' element={ <AdminHome /> } />
          </Route>
      </Routes>
    </>
  )
}

export default Navigation