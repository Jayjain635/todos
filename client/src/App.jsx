import React from 'react'
import Home from './pages/Home'
import Register from './pages/auth/Register'
import Update from './pages/auth/Update'
import Login from './pages/auth/Login'
import ResetPassword from './pages/ResetPassword'
import{BrowserRouter, Routes,Route} from 'react-router-dom'
// import Demo from './pages/demo'

import {ToastContainer } from 'react-toastify';
import Welcome from './pages/Welcome'
function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/' element={<Welcome />}></Route>

        {/* <Route path='/demo' element={<Demo />}></Route> */}
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/update' element={<Update />}></Route>
        <Route path='/ResetPassword' element={<ResetPassword />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App