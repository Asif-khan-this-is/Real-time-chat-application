const express = require('express')

const bcryptjs = require('bcryptjs')

const jwt = require('jsonwebtoken')

const cors = require('cors')

const io = require('socket.io')(8080,{
    cors: {
        origin : 'http://localhost:3000'
    }
})
// Connect DB
require('./db/connection')

// imports 
const Users = require('./models/Users')
const Conversations = require('./models/conversation')
const Messages = require('./models/messages')

// app use
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// Routes
const port = process.env.PORT || 8000

// Socket.io
let users = [];

io.on('connection', (socket) => {
    console.log('User Connected', socket.id);

    socket.on('addUser', (userId) => {
        const isUserExist = users.find((user) => user.userId === userId);
        if (!isUserExist) {
            const user = { userId, socketId: socket.id };
            users.push(user);
            io.emit('getUsers', users);
        }
    });

    socket.on('sendMessage', async ({ senderId, receiverId, message, conversationId }) => {
        const receiver = users.find((user) => user.userId === receiverId);
        const sender = users.find((user) => user.userId === senderId);
        const user = await Users.findById(senderId);
    
        if (receiver) {
            io.to(receiver.socketId).to(sender.socketId).emit('getMessage', {
                senderId,
                message,
                conversationId,
                receiverId,
                user: {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                },
            });
        }
    });
    

    socket.on('disconnect', () => {
        users = users.filter((user) => user.socketId !== socket.id);
        io.emit('getUsers', users);
    });
});

app.post('/api/register', async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body
        if (!fullName || !email || !password) {
            res.status(400).send("Please fill all the required details")
        } else {
            const isAlreadyExist = await Users.findOne({ email })
            if (isAlreadyExist) {
                res.status(400).send("Email already exists")
            } else {
                const newUser = new Users({ fullName, email })
                bcryptjs.hash(password, 10, (err, hashedPassword) => {
                    newUser.set('password', hashedPassword)
                    newUser.save()
                    next()
                })
                return res.status(200).send("User Registerd Successfully")
            }
        }
    } catch (error) {
        console.log("Error", error)
    }

})

app.post('/api/login', async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(400).send("Please fill all the required details")
        } else {
            const user = await Users.findOne({ email })
            if (!user) {
                res.status(400).send("Invalid email or passowrd")
            } else {
                const isMatch = await bcryptjs.compare(password, user.password)
                if (!isMatch) {
                    res.status(400).send("Invalid email or passowrd")
                } else {
                    const payLoad = {
                        userID: user._id,
                        email: user.email
                    }
                    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'This is jwt secret key'
                    jwt.sign(payLoad, JWT_SECRET_KEY, { expiresIn: 84600 }, async (err, token) => {
                        await Users.updateOne({ _id: user._id }, {
                            $set: { token }
                        })
                        user.save()
                        res.status(200).json({ user: {id:user._id, email: user.email, fullName: user.fullName }, token:token })
                    })
                    
                }
            }
        }
    } catch (error) {
        console.log("Error", error)
    }
})

app.post('/api/conversation', async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        const existingConversation = await Conversations.findOne({
            members: { $all: [senderId, receiverId] }
        });

        if (existingConversation) {
            return res.status(200).json({ message: "Conversation already exists", conversationId: existingConversation._id });
        } else {
            const newConversation = new Conversations({ members: [senderId,receiverId] });
            await newConversation.save();
            return res.status(200).json({ message: "Conversation created successfully", conversationId: newConversation._id });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).send("Server Error");
    }
});


app.get('/api/conversation/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const conversations = await Conversations.find({ members: { $in: [userId] } });

        const conversationUserData = Promise.all(conversations.map(async (conversation) => {
            const receiverId = conversation.members.find((member) => member !== userId);
            const user = await Users.findById(receiverId)
            return { user: {receiverId:user._id, email: user.email, fullName: user.fullName }, conversationId: conversation._id }
        }))
        res.status(200).json(await conversationUserData);
    } catch (error) {
        console.log("error", error);
        // res.status(500).send("Server Error");
    }
});

app.post('/api/message', async (req, res) => {
    try {
        const { conversationId, senderId, message, receiverId } = req.body;

        // Check if the conversation exists
        let existingConversation = null;
        if (conversationId !== 'new') {
            existingConversation = await Conversations.findById(conversationId);
        }

        // If no existing conversation, create a new one
        if (!existingConversation && receiverId) {
            const newConversation = new Conversations({
                members: [senderId, receiverId]
            });
            await newConversation.save();
            existingConversation = newConversation;
        }

        // Create and save the new message
        const newMessage = new Messages({
            conversationId: existingConversation ? existingConversation._id : conversationId,
            senderId,
            message,
            receiverId
        });
        await newMessage.save();
        
        res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
        console.log("error", error);
        res.status(500).send("Server Error");
    }
});
app.get('/api/message/:conversationId', async (req, res) => {
    try {
        const { conversationId } = req.params;
        const messages = await Messages.find({ conversationId }).sort({ createdAt: 1 }); // Sort messages if needed
        res.status(200).json(messages);
    } catch (error) {
        console.log("error", error);
        res.status(500).send("Server Error");
    }
});





app.get('/api/users/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const users = await Users.find({ _id: { $ne: userId } });
        const usersData = await Promise.all(users.map(async (user) => {
            return { user: { email: user.email, fullName: user.fullName, receiverId: user._id } };
        }));
        res.status(200).json(usersData);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Server Error");
    }
});

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`)
})

