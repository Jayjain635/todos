import React,{useState} from 'react'
import { useNavigate }  from 'react-router-dom'
import api from '../../api/api';
import getErrorMessage from '../../util/GetError'
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import getUserDetails from '../../util/GetUser';
function Update() {
    const navigater = useNavigate();
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [phone,setPhone]=useState('');
    const [password,setPassword]=useState('');
    const [loading,setLoading]=useState(false);
   const token = getUserDetails().token;
     const userId =jwtDecode(token).id
   const handleSubmit =async ()=>{
    console.log("clickedd");
       try {          
           setLoading(true);
           const data = {id:userId,name,email,phone,password};
           const response = await api.authServices.updateUser(data);
           console.log("response--->eee",response)
           setLoading(false);
           toast.success("Details updated Successfully",{autoClose: 1500,})
           navigater('/home')
       } catch (error) {
           console.log("errrrrr",error);
           toast.error (getErrorMessage(error),{   autoClose: 1500,})
           setLoading(false);
       }
   }
    return (
        <div className='flex bg-black justify-center items-center h-screen'>
            <div className='shadow-lg bg-white px-8 py-5  border w-96'>
                <h2 className='text-xl text-center font-bold mb-4 '>Update</h2>
                <div>
                    <div className='mb-4'> 
                        <label htmlFor="name" className='block text-gray-700'>Name</label>
                        <input type="text" name='name' onChange={(e)=>{setName(e.target.value)}}placeholder='Enter Name' className='w-full px-3 py-2 border'/>
                    </div>
                    <div className='mb-4'> 
                        <label htmlFor="email" className='block text-gray-700'>Email</label>
                        <input type="email" name='email' onChange={(e)=>{setEmail(e.target.value)}}  placeholder='Enter Email' className='w-full px-3 py-2 border'/>
                    </div>
                    <div className='mb-4'> 
                        <label htmlFor="phone" className='block text-gray-700'>Phone no</label>
                        <input type="text" name='phone'  onChange={(e)=>{setPhone(e.target.value)}}  placeholder='Enter Phone number' className='w-full px-3 py-2 border'/>
                    </div>
                    <div className='mb-4'> 
                        <label htmlFor="password" className='block text-gray-700'>Password</label>
                        <input type='password' name='password'  onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter Password' className='w-full px-3 py-2 border' />
                    </div>
                    <button className='w-full bg-blue-600 text-white py-2'onClick={handleSubmit} >{loading ? 'Updateing.....' : 'Update'}</button>
                </div>
               
            </div>
        </div>)
}

export default Update
