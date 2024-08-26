import React, { useEffect, useState } from 'react';
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { googleAuth, loginUser, validUser } from '../apis/auth';
import { Link, useNavigate } from 'react-router-dom';
import { BsEmojiLaughing, BsEmojiExpressionless } from "react-icons/bs";
import { toast } from 'react-toastify';

const defaultData = {
  email: "",
  password: ""
};

function Login() {
  const [formData, setFormData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const pageRoute = useNavigate();

  const googleSuccess = async (res) => {
    if (res?.profileObj) {
      setIsLoading(true);
      const response = await googleAuth({ tokenId: res.tokenId });
      setIsLoading(false);

      if (response.data.token) {
        localStorage.setItem("userToken", response.data.token);
        pageRoute("/chats");
      }
    }
  };

  const googleFailure = (error) => {
    toast.error("Something went wrong. Try again!");
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (formData.email.includes("@") && formData.password.length > 6) {
      setIsLoading(true);
      const { data } = await loginUser(formData);
      if (data?.token) {
        localStorage.setItem("userToken", data.token);
        toast.success("Successfully Logged In!");
        setIsLoading(false);
        pageRoute("/chats");
      } else {
        setIsLoading(false);
        toast.error("Invalid Credentials!");
        setFormData({ ...formData, password: "" });
      }
    } else {
      toast.warning("Provide valid Credentials!");
      setFormData(defaultData);
    }
  };

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
    
    const isValid = async () => {
      const data = await validUser();
      if (data?.user) {
        window.location.href = "/chats";
      }
    };
    isValid();
  }, []);

  return (
    <div className=' w-[100vw] h-[100vh] flex items-center'>
      {/* Left Side - Welcome Section */}
      <div className='w-[50%] h-[100%] flex justify-center items-center bg-gradient-to-r from-white via-gray-100 to-gray-100 '>
        <div className='text-center p-8'>
          <h1 className='text-4xl font-bold text-black mb-4'>Welcome back . . .</h1>
          <p className='text-black text-lg'>We're happy to see you again! Please login to continue.</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className='w-[50%] h-[100%] flex justify-center items-center bg-gradient-to-r from-gray-100 via-gray-100 to-white bg-white'>
        <div className='border border-gray-200 w-[80%] sm:w-[60%] p-6 h-[50%] rounded-xl shadow-lg'>
          <div className='mb-8'>
            <h3 className='text-2xl font-bold text-gray-900 tracking-wider'>Login to your account !</h3>
            
          </div>
          <form className='flex flex-col gap-y-3' onSubmit={formSubmit}>
            <div>
              <input
                className="w-full bg-gray-100 text-gray-800 h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={handleOnChange}
                name="email"
                type="email"
                placeholder='Email'
                value={formData.email}
                required
              />
            </div>
            <div className='  relative'>
              <input
                className='w-full bg-gray-100 text-gray-800 h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                onChange={handleOnChange}
                type={showPass ? "text" : "password"}
                name="password"
                placeholder='Password'
                value={formData.password}
                required
              />
              <button
                type='button'
                className='absolute top-3 right-3 text-gray-500'
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <BsEmojiExpressionless className='w-6 h-6' /> : <BsEmojiLaughing className='w-6 h-6' />}
              </button>
            </div>
            <button
              type='submit'
              className='w-full h-12 bg-blue-500  text-white rounded-xl font-bold mt-4 p-2'
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
          <p className='mt-6 ml-2 text-gray-600 text-sm '>
              Don't You have an account? <Link className='text-blue-600 underline' to="/register">Sign up</Link>
            </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
