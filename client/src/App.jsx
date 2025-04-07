import React from 'react'
import Home from './pages/Home'
import Register from './pages/Register'
import Update from './pages/Update'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import{BrowserRouter, Routes,Route} from 'react-router-dom'
// import Demo from './pages/demo'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
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