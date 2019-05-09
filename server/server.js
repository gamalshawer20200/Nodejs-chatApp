const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation')
const { Users } = require('./utils/users')

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {  //allows you to listen to an event and do something when this event happens
    console.log('New User Connected')


    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and Room name are required !')
            // we add return to stop executing the code below as it will crash when addUser is fired with inValid data
        }
        socket.join(params.room);
        //socket.leave('Yuma Fans')
        users.removeUser(socket.id) //remove from previous room
        users.addUser(socket.id, params.name, params.room)

        io.to(params.room).emit('updateUserList', users.getUserList(params.room))

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to The Chat-App'))
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`))
        callback()
    })

    socket.on('createMessage', (message, callback) => {
        console.log('Message', message)
        var user = users.getUser(socket.id)
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', {      //hub topology ... btb3t el msg L kolu beek nta kman
                from: user.name,
                text: message.text,
                createdAt: message.createdAt
            })
        }
        callback()
        //socket.broadcast.emit('newMessage', generateMessage(message.from, message.text))  //router topology ... btbt3t el msg L kolu ela enta
    })

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id)
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
        }
    })

    socket.on('disconnect', () => {
        // console.log('One User Disconnected !')
        var user = users.removeUser(socket.id)
        // console.log(socket.id)
        // console.log(user)
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room))
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the Room`))
        }
    })
})


server.listen(port, () => {
    console.log(`Server starting at port ${port} ...`)
})
