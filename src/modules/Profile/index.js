import React, { useState, useEffect } from 'react';
import Avatar from '../../assets/Avatar.svg'
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const [data, setData] = useState({
        fullName: '',
    })

    const [user, setUser] = useState({
        fullName: '',
        email: ''
    })

    useEffect(() => {
        const userDetail = localStorage.getItem('user:detail')
        if (userDetail) {
            const userData = JSON.parse(userDetail);
            setUser({
                fullName: userData.fullName,
                email: userData.email
            });
        }

    }, [])
    const handleLogout = () => {
        localStorage.removeItem('user:token');
        localStorage.removeItem('user:detail');
        window.location.href = '/users/sign_in'; //
    };

    const Navigate = useNavigate()
    const handleNavigate = () => {
        Navigate('/')
    }

    return (
        <div className='bg-secondary h-screen flex '>
            <div className='bg-light w-1/2 h-90 justify-center items-center flex flex-col p-10 gap-4'>
                <div className='text-2xl font-semibold '>
                    Hello {user.fullName}!
                </div>
                <div className='text-lg font-light '>
                    Welcome to your profile, {user.fullName}! Here, you can personalize your experience by updating your details and adding a profile photo. Make yourself at home and tailor your account to reflect your unique style.
                </div>
            </div>
            <div className='flex flex-col w-1/2 h-90 mt-10 pt-16'>
                <div className='flex flex-col items-center'>
                    <div className='flex p-4 w-1/2 rounded-full justify-center overflow-hidden '>
                        <img
                            src={Avatar}
                            className=' p-2 border border-gray-200 w-full h-full object-cover rounded-full '
                            width={20}
                        />
                    </div>


                    <div className='flex flex-col gap-2 items-center'>
                        <div className='text-2xl text-neutral-500 text-center'>{user.fullName}</div>
                        <div className='text-lg font-light text-center'>{user.email}</div>
                    </div>
                </div>
                    <div className='mt-4 flex items-center flex-col gap-2'>
                        <span className='flex gap-3 text-lg font-light cursor-pointer p-2 rounded-md' onClick={handleNavigate}>
                            Home
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                <path d="M10 18L14 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M2.35139 13.2135C1.99837 10.9162 1.82186 9.76763 2.25617 8.74938C2.69047 7.73112 3.65403 7.03443 5.58114 5.64106L7.02099 4.6C9.41829 2.86667 10.6169 2 12 2C13.3831 2 14.5817 2.86667 16.979 4.6L18.4189 5.64106C20.346 7.03443 21.3095 7.73112 21.7438 8.74938C22.1781 9.76763 22.0016 10.9162 21.6486 13.2135L21.3476 15.1724C20.8471 18.4289 20.5969 20.0572 19.429 21.0286C18.2611 22 16.5537 22 13.1388 22H10.8612C7.44633 22 5.73891 22 4.571 21.0286C3.40309 20.0572 3.15287 18.4289 2.65243 15.1724L2.35139 13.2135Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                            </svg>
                        </span>
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
    );
};

export default Profile;
