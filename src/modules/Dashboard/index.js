import React from 'react';
import Avatar from '../../assets/Avatar.svg';
import Input from '../../components/Input';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client'

const Dashboard = () => {
    const token = localStorage.getItem('user:token');
    const navigate = useNavigate();
    const [user, setUser] = useState({ fullName: '' });
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState({});
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([])
    const socket = io('http://localhost:8080');

    socket.on('getMessage', (data) => {
        // Update your UI with the new message data
        console.log('Message received:', data);
        // You might need to append the message to a chat window or similar
    });

    useEffect(() => {
        socket?.emit('addUser', user?.id)
        socket?.on('getUsers', users => {
            console.log('activeUsers :>>', users)
        })
        socket?.on('getMessage', data => {
            console.log('data :>>', data);
            setMessages(prev => ({ ...prev, messages: [...prev.messages, { user: data.user, message: data.message }] }))
        })
    }, [socket])
    const handleLogout = () => {
        localStorage.removeItem('user:token');
        localStorage.removeItem('user:detail');
        navigate('/users/sign_in');
    };
    const handleNavigate = () => {
        navigate('/users/profile');
    };



    const sendMessage = async () => {
        socket.emit('sendMessage', {
            senderId: user?.id,
            receiverId: messages?.receiver?.receiverId,
            message,
            conversationId: messages?.conversationId
        });
        

        const res = await fetch('http://localhost:8000/api/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                conversationId: messages?.conversationId || 'new',
                senderId: user?.id,
                message,
                receiverId: messages?.receiver?.receiverId
            })
        });

        if (res.ok) {
            setMessage('');
            // Optionally fetch messages again or update UI
        } else {
            console.error('Failed to send message');
        }
    };


    const fetchMessages = async (conversationId, user) => {
        try {
            const res = await fetch(`http://localhost:8000/api/message/${conversationId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const resData = await res.json();
            setMessages({
                messages: resData,
                receiver: user,
                conversationId
            });
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        const userDetail = localStorage.getItem('user:detail');
        if (userDetail) {
            const userData = JSON.parse(userDetail);
            setUser({ fullName: userData.fullName, id: userData.id });
        }
    }, []);

    useEffect(() => {
        const fetchConversations = async () => {
            const loggedInUser = JSON.parse(localStorage.getItem('user:detail'));
            try {
                const res = await fetch(`http://localhost:8000/api/conversation/${loggedInUser?.id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                const resData = await res.json();
                setConversations(resData);
            } catch (error) {
                console.error('Error fetching conversations:', error);
            }
        };

        fetchConversations();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            if (user?.id) {
                try {
                    const res = await fetch(`http://localhost:8000/api/users/${user.id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    const resData = await res.json();
                    console.log(resData);
                    setUsers(resData);
                } catch (error) {
                    console.error("Error fetching users:", error);
                }
            }
        };
        fetchUsers();
    }, [user?.id]);

    return (
        <div className='w-screen flex'>
            <div className='w-[25%] h-screen bg-secondary overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200'>
                <div className='justify-center flex items-center my-8'>
                    <div className='rounded-full p-[4px] overflow-hidden'>
                        <img className='rounded-full border border-gray-700' src="https://media.licdn.com/dms/image/v2/D5603AQG9tPbPz-iUrQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1709665436580?e=1729123200&v=beta&t=UPWmMD2hHi9B7c29ZVICf0upGIVslA4W4K9QdHmvf0E" width="50" height="50" alt="Avatar" />
                    </div>
                    <div className='ml-4 flex flex-col'>
                        <h3 className='text-2xl'>{user.fullName}</h3>
                        <p className='text-lg text-gray-500 cursor-pointer' onClick={handleNavigate}>My account</p>
                    </div>
                    <div className='p-2 cursor-pointer' onClick={handleLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none">
                            <path d="M11 3L10.3374 3.23384C7.75867 4.144 6.46928 4.59908 5.73464 5.63742C5 6.67576 5 8.0431 5 10.7778V13.2222C5 15.9569 5 17.3242 5.73464 18.3626C6.46928 19.4009 7.75867 19.856 10.3374 20.7662L11 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M21 12L11 12M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
                <hr />
                <div className='mx-6 mt-4'>
                    <div className='text-xl ml-10 font-semibold'>Messages</div>
                    <div>
                        {conversations.length > 0 ?
                            conversations.map(({ conversationId, user }) => (
                                <div key={conversationId} className='flex ml-10 mt-2 border-b py-4'>
                                    <div className='flex items-center cursor-pointer' onClick={() => fetchMessages(conversationId, user)}>
                                        <div className='flex rounded-full overflow-hidden'>
                                            <img src={Avatar} width="30" height="30" alt="Avatar" />
                                        </div>
                                        <div className='ml-3 flex flex-col'>
                                            <h3 className='font-semibold'>{user?.fullName}</h3>
                                            <p className='text-sm text-gray-500'>{user?.email}</p>
                                        </div>
                                    </div>
                                </div>
                            )) : <div className='text-lg font-medium text-center mt-32'>No Conversation</div>
                        }
                    </div>
                </div>
            </div>
            <div className='w-[53%] h-screen bg-white flex flex-col items-center'>
                {messages?.receiver?.fullName && (
                    <div className='w-[75%] bg-secondary h-[80px] items-center flex mx-14 my-10 rounded-full p-4 shadow-md'>
                        <div className='ml-10'>
                            <img src={Avatar} width="50" height="50" alt="Avatar" />
                        </div>
                        <div className='ml-3'>
                            <h3 className='text-lg'>{messages?.receiver?.fullName}</h3>
                            <p className='text-sm font-light text-gray-500'>{messages?.receiver?.email}</p>
                        </div>
                    </div>
                )}

                <div className='h-[75%] w-full overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200'>
                    <div className='p-14'>
                        {messages?.messages?.length > 0 ?
                            messages?.messages?.map(({ message, senderId }, index) => (
                                <div key={index} className={`max-w-[40%] rounded-b-xl p-4 mb-6 ${senderId === user?.id ? 'bg-primary rounded-tl-xl ml-auto text-white' : 'bg-secondary rounded-tr-xl'}`}>
                                    {message}
                                </div>
                            )) : <div className='text-center text-lg font-medium mt-[18rem]'>No Messages <div></div><span>or </span>No Conversation Selected</div>
                        }
                    </div>

                </div>

                {messages?.receiver?.fullName && (
                    <div className='p-10 w-full flex items-center justify-center gap-5'>
                        <Input
                            placeholder='Type a Message...'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className='bg-light shadow-md focus:ring-0 focus:outline-none rounded-full border:0 focus:border:0 w-[102%]'
                        />
                        <div
                            className={`bg-light p-4 rounded-full cursor-pointer ${message ? 'text-primary' : 'text-gray-400'}`}
                            onClick={sendMessage}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="#000000" fill="none">
                                <path d="M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M11.5 12.5L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div
                            className='bg-light p-4 rounded-full cursor-pointer text-gray-400'
                            onClick={() => {/* Handle plus button click */ }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" color="#000000" fill="none">
                                <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                )}
            </div>
            <div className='pt-10 w-[22%] h-screen bg-secondary overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200 '>
                <div className='text-center font-semibold text-lg' >Users</div>
                <div>
                    {users.length > 0 ?
                        users.map(({ userId, user }) => (
                            <div key={userId} className='flex ml-10 mt-2 border-b py-4'>
                                <div className='flex items-center cursor-pointer' onClick={() => fetchMessages('new', user)}>
                                    <div className='flex rounded-full overflow-hidden'>
                                        <img src={Avatar} width="30" height="30" alt="Avatar" />
                                    </div>
                                    <div className='ml-3 flex flex-col'>
                                        <h3 className='font-semibold'>{user?.fullName}</h3>
                                        <p className='text-sm text-gray-500'>{user?.email}</p>
                                    </div>
                                </div>
                            </div>
                        )) : <div className='text-lg font-medium text-center mt-32'>No Conversation</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
