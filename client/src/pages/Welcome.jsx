import React from 'react'
import { Link } from 'react-router-dom';
function Welcome() {
 
  return (
    <div className='flex flex-col items-center justify-center bg-black h-screen'>
    
    <div className='bg-black w-screen font-bold text-2xl text-white items-center flex justify-center h-20 text-center '>
      WELCOME TO TODO
    </div>
    <div className='flex items-center justify-center  mt-5 gap-8 p-2 px-5 h-20 w-70'>
        <div className='border p-1 px-2 text-white font-bold'><Link to='/register'>Register</Link></div>
        <div className='border p-1 px-2 text-white font-bold'><Link to='/login'>Login</Link></div>
    </div>
    </div>
  )
}

export default Welcome
