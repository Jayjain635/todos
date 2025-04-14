import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import api from '../../api/api';
import getErrorMessage from '../../util/GetError'
import { toast } from 'react-toastify';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";



function Register() {
    const navigater = useNavigate();
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [phone,setPhone]=useState('');
    const [password,setPassword]=useState('');
    const [loading,setLoading]=useState(false);
     const [showPassword, setShowPassword] = useState(false);
    useEffect(()=>{
        var x = localStorage.getItem("todoAppUser");
        if(x){
            return navigater('/home');
        }  
        },[])
   const handleSubmit =async ()=>{
       try {     
           if(email =='' || password=='' || name =='' || phone == ''){
               toast.error ("Enter all details",{   autoClose: 1500,});
               return ;
           }       
           setLoading(true);
           const data = {name,email,phone,password};
           
           const response = await api.authServices.registerUser(data);
           setLoading(false);
           toast.success("Registerd Successfully",{   autoClose: 1500,})
           navigater('/login')
           console.log("response--->",response.data)
       } catch (error) {
           console.log("errrrrr",error);
           toast.error (getErrorMessage(error),{   autoClose: 1500,})
           setLoading(false);
       }
   }
  return (
    <div className='flex justify-center items-center h-screen bg-black'>
        <div className='shadow-lg px-8 py-5  border w-96 bg-white'>
            <h2 className='text-xl text-center font-bold mb-4 '>Register</h2>
            <div >
                <div className='mb-4'> 
                    <label htmlFor="name" className='block text-gray-700'>Name</label>
                    <input type="text"  onChange={(e)=>{setName(e.target.value)}} placeholder='Enter Name' className='w-full px-3 py-2 border'/>
                </div>
                <div className='mb-4'> 
                    <label htmlFor="email" className='block text-gray-700'>Email</label>
                    <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder='Enter Email' className='w-full px-3 py-2 border'/>
                </div>
                <div className='mb-4'> 
                    <label htmlFor="phone" className='block text-gray-700'>Phone no</label>
                    <input type="text"  onChange={(e)=>{setPhone(e.target.value)}} placeholder='Enter Phone number' className='w-full px-3 py-2 border'/>
                </div>
                <div className="mb-6">
                           <label htmlFor="password" className="block text-gray-700">Password</label>
                           <div className="relative">
                             <input
                               type={showPassword ? 'text' : 'password'} 
                               onChange={(e) => setPassword(e.target.value)}
                               placeholder="Enter Password"
                               className="w-full px-3 py-2 border"
                             />
                             <span
                               onClick={() => setShowPassword(!showPassword)}
                               className="absolute right-3 top-3 cursor-pointer text-gray-600"
                             >
                               {showPassword ? <IoEye /> : <IoMdEyeOff />} 
                             </span>
                           </div>
                         </div>
                <button className='w-full bg-blue-600 text-white py-2' onClick={handleSubmit}>{loading ? 'Registering.....' : 'Register'}</button>
            </div>
            <div className='text-center'>
                <p>Already have account ? 
                <Link to="/login" className='text-blue-500 font-bold'> Login  </Link></p>
            </div>
        </div>
    </div>
  )
}

export default Register
