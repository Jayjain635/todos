import React ,{ useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios";

function Login() {
    const navigater = useNavigate();
  const [values,setValues]=useState({
    email:'',
    password : ''
})

const handleChanges = (e)=>{
    setValues({...values,[e.target.name]:e.target.value})
}
const handleSubmit =async (e)=>{
    e.preventDefault();
    try {            
        const response = await axios.post('http://localhost:5000/api/user/login',values)
        console.log("response--->",response);
        if(response.status===200){
          navigate('/')
        }   
    } catch (error) {
        if (error.response) {
          alert(error.response.data.message)
            console.error('Backend error:', error.response.data.message);
        } else if (error.request) {
            console.error('No response:', error.request);
        } 
    }
}

  return (
    <div className='flex justify-center items-center h-screen'>
    <div className='shadow-lg px-8 py-5 border w-96'>
        <h2 className='text-xl text-center font-bold mb-4 '>Login</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-4'> 
                <label htmlFor="email" className='block text-gray-700'>Email</label>
                <input type="email" name='email' onChange={handleChanges} placeholder='Enter Email' className='w-full px-3 py-2 border'/>
            </div>
    
            <div className='mb-6'> 
                <label htmlFor="password" className='block text-gray-700'>Password</label>
                <input type='password' name='password' onChange={handleChanges} placeholder='Enter Password' className='w-full px-3 py-2 border' />
            </div>
            <button className='w-full bg-blue-500 text-white py-2' onClick={()=>navigater('/')}>Login</button>
        </form>
        <div className='text-center'>
            <p>Don't have account ? 
            <Link to="/Register"> Register  </Link></p>
        </div>
    </div>
</div>
  )
}

export default Login
