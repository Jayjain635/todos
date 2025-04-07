import React from 'react'
import {useNavigate} from 'react-router-dom'

function ResetPassword() {
    const navigate = useNavigate();
   function handleChanges(){}
   function handleSubmit(){}
  return (
    <div className='flex justify-center items-center h-screen'>
    <div className='shadow-lg px-8 py-5 border w-96'>
        <h2 className='text-xl text-center font-bold mb-4 '>Reset Password</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-4'> 
                <label htmlFor="email" className='block text-gray-700'>Email</label>
                <input type="email" name='email' onChange={handleChanges} placeholder='Enter Email' className='w-full px-3 py-2 border'/>
            </div>
    
            <div className='mb-6'> 
                <label htmlFor="password" className='block text-gray-700'>Password</label>
                <input type='password' name='password' onChange={handleChanges} placeholder='Enter Password' className='w-full px-3 py-2 border' />
            </div>
            <button className='w-full bg-blue-500 text-white py-2' onClick={()=>{navigate("/Login")}} >Reset</button>
        </form>
        
    </div>
</div>
  )
}

export default ResetPassword
