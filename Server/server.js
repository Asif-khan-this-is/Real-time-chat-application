const express = require('express')

const bcryptjs = require('bcryptjs')

const jwt = require('jsonwebtoken')

const cors = require('cors')
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
app.get('/', (req, res) => {
    res.send("Welcome")
})

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
                        res.status(200).json({ user: { email: user.email, fullName: user.fullName }, token:token })
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
        const { senderId, recieverId } = req.body
        const newConversation = new Conversations({ members: [senderId, recieverId] })
        await newConversation.save()
        res.status(200).send("Conversation created successfully")
    } catch (error) {
        console.log("error", error)
    }
})

app.get('/api/conversation/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const conversations = await Conversations.find({ members: { $in: [userId] } });

        const conversationUserData = Promise.all(conversations.map(async (conversation) => {
            const recieverId = conversation.members.find((member) => member !== userId);
            const user = await Users.findById(recieverId)
            return { user: { email: user.email, fullName: user.fullName }, conversationId: conversation._id }
        }))
        res.status(200).json(await conversationUserData);
    } catch (error) {
        console.log("error", error);
        // res.status(500).send("Server Error");
    }
});

app.post('/api/message', async (req, res) => {
    try {
        const { conversationId, senderId, message, recieverId = '' } = req.body;
        if (!senderId || !message) return res.status(400).send('fill all required fields')
        if (!conversationId && recieverId) {
            const newConversation = new Conversations({ members: [senderId, recieverId] })
            await newConversation.save()
            const newMessage = new Messages({ conversationId: newConversation._id, senderId, message })
            await newMessage.save()
            res.status(200).send("Message sent successfully")
        } else if (!conversationId && !recieverId) {
            res.status(400).send("Please fill out all the required details")
        }
        const newMessage = new Messages({ conversationId, senderId, message });
        await newMessage.save();
        res.status(200).send("Message sent successfully");
    } catch (error) {
        console.log("Error", error)
    }
})

app.get('/api/message/:conversationId', async (req, res) => {
    try {
        const conversationId = req.params.conversationId;
        if (conversationId === 'new') return res.status(200).json([])
        const messages = await Messages.find({ conversationId });
        const messageUserData = Promise.all(messages.map(async (message) => {
            const user = await Users.findById(message.senderId)
            return { user: { email: user.email, fullName: user.fullName }, message: message.message }
        }))
        res.status(200).json(await messageUserData)
    } catch (error) {
        console.log("error", error)
    }
})

app.get('/api/users', async (req, res) => {
    try {
        const users = await Users.find();
        const usersData = Promise.all(users.map(async (user) => {
            return { user: { email: user.email, fullName: user.fullName }, userId: user._id }
        }))
        res.status(200).json(await usersData);
    } catch (error) {
        console.log("erro", error)
    }
})

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`)
})

