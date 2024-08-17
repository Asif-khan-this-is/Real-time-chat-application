import React from 'react'
import Avatar from '../../assets/Avatar.svg'
import Input from '../../components/Input'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
    const contacts = [
        {
            name: "Gonu",
            status: "Available",
            img: 'https://www.partysuppliesindia.com/cdn/shop/products/A1_49_8742dfc8-aa21-4955-bcb9-7e117d72f8cc.jpg?v=1619169667'
        },
        {
            name: "Deepak",
            status: "Available",
            img: 'https://www.partysuppliesindia.com/cdn/shop/products/A1_49_8742dfc8-aa21-4955-bcb9-7e117d72f8cc.jpg?v=1619169667'
        },
        {
            name: "Harsh",
            status: "Available",
            img: 'https://www.partysuppliesindia.com/cdn/shop/products/A1_49_8742dfc8-aa21-4955-bcb9-7e117d72f8cc.jpg?v=1619169667'
        },
        {
            name: "Riya",
            status: "Available",
            img: Avatar
        },
        {
            name: "Pratham",
            status: "Available",
            img: Avatar
        },
        {
            name: "Abhi",
            status: "Available",
            img: Avatar
        },
        {
            name: "Abhi",
            status: "Available",
            img: Avatar
        },
        {
            name: "Abhi",
            status: "Available",
            img: Avatar
        },
        {
            name: "Abhi",
            status: "Available",
            img: Avatar
        },

    ]
    const token = localStorage.getItem('user:token')
    console.log('token',token)
    const navigate = useNavigate()
    const hadnleLogout = () => {
        localStorage.removeItem('user:token')
        localStorage.removeItem('user:detail')
        navigate('/users/sign_in')
    }
    const handleNavigate = () => {
        navigate('/users/profile')
    }
    return (
        <div className='w-screen flex'>
            <div className='w-[25%]  h-screen bg-secondary overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200'>
                <div className=' justify-center flex items-center my-8'>
                    <div className=' rounded-full p-[4px] overflow-hidden'><img className='rounded-full border border-gray-700' src="https://media.licdn.com/dms/image/v2/D5603AQG9tPbPz-iUrQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1709665436580?e=1729123200&v=beta&t=UPWmMD2hHi9B7c29ZVICf0upGIVslA4W4K9QdHmvf0E" width="50" height="50"></img></div>
                    <div className='ml-4 flex flex-col'>
                        <h3 className='text-2xl'>Neeraj</h3>
                        <p className='text-lg text-gray-500 cursor-pointer' onClick={() => handleNavigate()}>My account</p>
                    </div>
                    <div className='p-2 cursor-pointer' onClick={()=>hadnleLogout()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none">
                            <path d="M11 3L10.3374 3.23384C7.75867 4.144 6.46928 4.59908 5.73464 5.63742C5 6.67576 5 8.0431 5 10.7778V13.2222C5 15.9569 5 17.3242 5.73464 18.3626C6.46928 19.4009 7.75867 19.856 10.3374 20.7662L11 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M21 12L11 12M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>

                </div>
                <hr />
                <div className='mx-6 mt-4 '>
                    <div className='text-xl ml-10 font-semibold'>Messages</div>
                    <div>
                        {
                            contacts.map(({ name, status, img }) => {
                                return <div className=' flex ml-10 mt-2 border-b py-4'>
                                    <div className='flex items-center cursor-pointer'>
                                        <div className='flex rounded-full  overflow-hidden' ><img src={img} width="30" height="30"></img></div>
                                        <div className='ml-3 flex flex-col'>
                                            <h3 className='font-semibold '>{name}</h3>
                                            <p className='text-sm text-gray-500'>{status}</p>
                                        </div>
                                    </div>


                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='w-[75%] h-screen bg-white flex flex-col items-center'>
                <div className='w-[75%] bg-secondary  h-[80px] items-center flex mx-14 my-10 rounded-full shadow-md'>
                    <div className='ml-10'>
                        <img src={Avatar} width="50" height="50"></img>
                    </div>
                    <div className='ml-3'>
                        <h3 className='text-lg'>Gonu</h3>
                        <p className='text-sm font-light text-gray-500'>Online</p>
                    </div>
                </div>
                <div className='h-[75%]  w-full overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200'>
                    <div className=' p-14'>
                        <div className='bg-secondary  max-w-[40%]  rounded-b-xl rounded-tr-xl p-4 mb-6 shadow-md'>
                            I am Neeraj Bhasin yoyo hehee ahahah
                        </div>
                        <div className='bg-primary max-w-[40%] rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6 shadow-md'>
                            I am Neeraj Bhasin yoyo hehee ahahah
                        </div>
                        <div className='bg-secondary  max-w-[40%]  rounded-b-xl rounded-tr-xl p-4 mb-6 shadow-md'>
                            I am Neeraj Bhasin yoyo hehee ahahah
                        </div>
                        <div className='bg-primary max-w-[40%] rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6 shadow-md'>
                            I am Neeraj Bhasin yoyo hehee ahahah
                        </div>
                        <div className='bg-secondary  max-w-[40%]  rounded-b-xl rounded-tr-xl p-4 mb-6 shadow-md'>
                            I am Neeraj Bhasin yoyo hehee ahahah
                        </div>
                        <div className='bg-primary max-w-[40%] rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6 shadow-md'>
                            I am Neeraj Bhasin yoyo hehee ahahah
                        </div>
                        <div className='bg-secondary  max-w-[40%]  rounded-b-xl rounded-tr-xl p-4 mb-6 shadow-md'>
                            I am Neeraj Bhasin yoyo hehee ahahah
                        </div>
                        <div className='bg-primary max-w-[40%] rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6 shadow-md'>
                            I am Neeraj Bhasin yoyo hehee ahahah
                        </div>
                        <div className='bg-secondary  max-w-[40%]  rounded-b-xl rounded-tr-xl p-4 mb-6 shadow-md'>
                            I am Neeraj Bhasin yoyo hehee ahahah
                        </div>
                        <div className='bg-primary max-w-[40%] rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6 shadow-md'>
                            I am Neeraj Bhasin yoyo hehee ahahah
                        </div>
                        <div className='bg-secondary  max-w-[40%]  rounded-b-xl rounded-tr-xl p-4 mb-6 shadow-md'>
                            I am Neeraj Bhasin yoyo hehee ahahah
                        </div>
                        <div className='bg-primary max-w-[40%] rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6 shadow-md'>
                            I am Neeraj Bhasin yoyo hehee ahahah
                        </div>
                        <div className='bg-secondary  max-w-[40%]  rounded-b-xl rounded-tr-xl p-4 mb-6 shadow-md'>
                            I am Neeraj Bhasin yoyo hehee ahahah
                        </div>
                        <div className='bg-primary max-w-[40%] rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6 shadow-md'>
                            I am Neeraj Bhasin yoyo hehee ahahah
                        </div>
                    </div>

                </div>
                <div className='p-10  w-full flex items-center justify-center  gap-5'>
                    <Input placeholder='Type a Message...' className='bg-light shadow-md focus:ring-0 focus:outline-none rounded-full border:0 focus:border:0 w-[102%]' />
                    <div className=' bg-light p-4 rounded-full cursor-pointer shadow-md'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="#000000" fill="none">
                            <path d="M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z" stroke="currentColor" stroke-width="1.5" />
                            <path d="M11.5 12.5L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div className=' bg-light p-4 rounded-full cursor-pointer shadow-md'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="#000000" fill="none">
                            <path d="M12 8V16M16 12L8 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" />
                        </svg>
                    </div>
                </div>
            </div>
            {/* <div className='w-[25%] bg-secondary  h-screen'></div> */}
        </div>
    )
}

export default Dashboard
