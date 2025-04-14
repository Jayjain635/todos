import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import getErrorMessage from '../../util/GetError';
import { toast } from 'react-toastify';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('todoAppUser');
    if (user) {
      navigate('/home');
    }
  },[]);

  const handleSubmit = async () => {
    try {
      if (email === '' || password === '') {
        toast.error('Enter all details', { autoClose: 1500 });
        return;
      }
      setLoading(true);
      const data = { email, password };
      const response = await api.authServices.loginUser(data);

      localStorage.setItem('todoAppUser', JSON.stringify(response.data));
      setLoading(false);

      toast.success('Login Successfully', { autoClose: 1500 });
      navigate('/home');
    } catch (error) {
      console.log('Error:', error);
      toast.error(getErrorMessage(error), { autoClose: 1500 });
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="shadow-lg px-8 py-5 border w-96 bg-white">
        <h2 className="text-xl text-center font-bold mb-4">Login</h2>
        <div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="w-full px-3 py-2 border"
            />
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
          <button
            className="w-full bg-blue-500 text-white py-2"
            onClick={handleSubmit}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
        <div className="text-center">
          <p>
            Don't have an account?{' '}
            <Link to="/Register" className="text-blue-500 font-bold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
