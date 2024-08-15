import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
const Form = ({
    isSignin = false
}) => {
    const [data, setData] = useState({
        ...(!isSignin && {
            fullName: ''
        }),
        email: '',
        password: ''
    });

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        console.log('data : >>',data);
        e.preventDefault();
        const res = await fetch(`http://localhost:8000/api/${isSignin ? 'login' : 'register'}`,{
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
        
        if(res.status == 400){
            alert('Invalid Credentials')
        }else{
            const resData = await res.json() 
            if(resData.token){
                localStorage.setItem('user:token', resData.token)
                localStorage.setItem('user:detail',JSON.stringify(resData.user))
                navigate('/')
            }
        }
        
    }
    return (
        <div className="form-container flex items-center justify-center min-h-screen">
            <div className='left w-1/2 p-8 flex flex-col  '>
                <div className='text-2xl font-extrabold mb-4 text-center'>
                    Welcome
                </div>
                <div className='text-lg font-light ml-5'>
                    {isSignin
                        ? "Discover the ultimate platform to connect with friends, share updates, and stay informed. Sign in to access your personalized dashboard, manage your profile, and engage with your community. We're committed to providing you with the best experience possible, ensuring that your time on our platform is both enjoyable and productive."
                        : "Join our vibrant community and start your journey with us! Create an account to unlock a world of features designed to enhance your online experience. From connecting with like-minded individuals to accessing exclusive content, our platform offers a wealth of opportunities. Register now and be part of something great!"}
                </div>
            </div>
            <div className='right w-1/2 p-8 flex items-center justify-center'>
                <div className='bg-white w-full max-w-md h-auto shadow-lg rounded-xl flex flex-col justify-center items-center p-8'>
                    <div className='text-2xl font-extrabold mb-4'>
                        {isSignin ? 'Welcome Back' : 'Welcome'}
                    </div>
                    <div className='text-xl font-light mb-10'>
                        {isSignin ? 'Login to explore more' : 'Ready to explore? Create your account'}
                    </div>
                    <form className='flex flex-col w-full ' onSubmit={(e) => handleSubmit(e)}>
                        {!isSignin && (
                            <Input 
                                label="Full Name" 
                                name="name" 
                                placeholder='Enter Your Name' 
                                value={data.fullName} 
                                onChange={(e) => setData({ ...data, fullName: e.target.value })} 
                                className='mb-6' 
                            />
                        )}
                        <Input 
                            label="Email" 
                            name="email" 
                            type='email' 
                            placeholder='Enter Your email' 
                            value={data.email} 
                            onChange={(e) => setData({ ...data, email: e.target.value })} 
                            className='mb-6' 
                        />
                        <Input 
                            label="Password" 
                            name="password" 
                            type='password' 
                            placeholder='Enter Your Password' 
                            value={data.password} 
                            onChange={(e) => setData({ ...data, password: e.target.value })} 
                            className='mb-6' 
                        />
                        <Button className='w-1/2' type='submit' label={isSignin ? 'Sign in' : 'Sign up'} />
                    </form>
                    <div className='mt-4'>
                        {isSignin ? "Don't have an account?" : "Already have an account?"} 
                        <span className='text-primary cursor-pointer underline ml-2' onClick={()=>navigate(`/users${isSignin?'/sign_up':'/sign_in'}`)}>
                            {isSignin ? "Sign up" : "Sign in"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;
