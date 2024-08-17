import React, { useState, useEffect } from 'react';
import Input from '../../components/Input';

const Profile = () => {
    const [data, setData] = useState({
        fullName: '',
    })
    
    const [user,setUser] = useState({
        fullName : '',
        email : ''
    })

    useEffect(()=>{
        const userDetail = localStorage.getItem('user:detail')
        if(userDetail){
            const userData = JSON.parse(userDetail);
            setUser({
                fullName: userData.fullName,
                email: userData.email
            });
        }

    },[])
    const handleLogout = () => {
        localStorage.removeItem('user:token');
        localStorage.removeItem('user:detail');
        window.location.href = '/users/sign_in'; //
    };

    return (
        <div className='bg-secondary h-screen flex'>
            <div className='bg-light w-1/2 h-90 justify-center items-center flex flex-col p-10 gap-4'>
                <div className='text-2xl font-semibold '>
                    Hello {user.fullName}!
                </div>
                <div className='text-lg font-light '>
                    Welcome to your profile, {data.fullName}! Here, you can personalize your experience by updating your details and adding a profile photo. Make yourself at home and tailor your account to reflect your unique style.
                </div>
            </div>
            <div className='flex flex-col w-1/2 h-90 mt-10'>
                <div className='flex flex-col items-center'>
                    <div className='flex p-4 w-1/2 rounded-full overflow-hidden '>
                        <img
                            src='https://i.guim.co.uk/img/media/c8c00617b792d1d53f2d2b318820d5758dc61551/231_0_2968_1782/master/2968.jpg?width=1200&quality=85&auto=format&fit=max&s=99459057199a54c97181e29b0947b5fb'
                            className='w-full h-full object-cover rounded-full '
                        />
                    </div>
                    
                 
                    <div className='flex flex-col gap-2 items-center'>
                        <div className='text-2xl text-neutral-500 text-center'>{user.fullName}</div>
                        <div className='text-lg font-light text-center'>{user.email}</div>
                    </div>
                </div>
                <div className='p-4 flex flex-col gap-3 mt-2'>
                    <div className='text-xl font-medium flex flex-col gap-5 items-center'>
                        Edit Your Full Name Here!
                        <Input
                            name='fullName'
                            value={data.fullName}
                            onChange={(e) => setData({ ...data, fullName: e.target.value })}
                            placeholder='Enter your new Full Name...'
                            className='w-full p-2 border rounded-md'
                        />
                    </div>

                    <div className='my-4 p-3 flex justify-center'>
                        <button
                            className='flex gap-3 text-lg font-light cursor-pointer bg-blue-500 text-white p-2 rounded-md'
                           
                        >
                            Update Profile
                        </button>
                    </div>
                    <div className=' flex justify-center'>
                        <span
                            className='flex gap-3 text-lg font-light cursor-pointer p-2 rounded-md'
                            onClick={handleLogout}
                        >
                            Logout
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                <path d="M11 3L10.3374 3.23384C7.75867 4.144 6.46928 4.59908 5.73464 5.63742C5 6.67576 5 8.0431 5 10.7778V13.2222C5 15.9569 5 17.3242 5.73464 18.3626C6.46928 19.4009 7.75867 19.856 10.3374 20.7662L11 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M21 12L11 12M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
