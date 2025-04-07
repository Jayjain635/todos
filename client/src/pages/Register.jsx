import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Register() {
    const navigater = useNavigate();
    const [values,setValues]=useState({
        name:'',
        email:'',
        phone : '',
        password : ''
    })

    const handleChanges = (e)=>{
        setValues({...values,[e.target.name]:e.target.value})
    }
    const handleSubmit =async (e)=>{
        e.preventDefault();
        try {            
            console.log(values , "<---values");
            
            const response = await axios.post('http://localhost:5000/api/user/register',values)
            console.log(response);
        } catch (error) {
            if (error.response) {
                console.error('Backend responded with an error:', error.response.data.message);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Axios setup issue:', error.message);
            }
        }
    }
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='shadow-lg px-8 py-5  border w-96'>
            <h2 className='text-xl text-center font-bold mb-4 '>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'> 
                    <label htmlFor="name" className='block text-gray-700'>Name</label>
                    <input type="text" name='name' onChange={handleChanges} placeholder='Enter Name' className='w-full px-3 py-2 border'/>
                </div>
                <div className='mb-4'> 
                    <label htmlFor="email" className='block text-gray-700'>Email</label>
                    <input type="email" name='email' onChange={handleChanges} placeholder='Enter Email' className='w-full px-3 py-2 border'/>
                </div>
                <div className='mb-4'> 
                    <label htmlFor="phone" className='block text-gray-700'>Phone no</label>
                    <input type="text" name='phone' onChange={handleChanges} placeholder='Enter Phone number' className='w-full px-3 py-2 border'/>
                </div>
                <div className='mb-4'> 
                    <label htmlFor="password" className='block text-gray-700'>Password</label>
                    <input type='password' name='password' onChange={handleChanges} placeholder='Enter Password' className='w-full px-3 py-2 border' />
                </div>
                <button className='w-full bg-blue-600 text-white py-2' onClick={()=>navigater('/login')}>Register</button>
            </form>
            <div className='text-center'>
                <p>Already have account ? 
                <Link to="/login"> Login  </Link></p>
            </div>
        </div>
    </div>
  )
}

export default Register
