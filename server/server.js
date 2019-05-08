const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {  //allows you to listen to an event and do something when this event happens
    console.log('New User Connected')

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to The Chat-App'))

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'))

    socket.on('createMessage', (message, callback) => {
        console.log('Message', message)
        io.emit('newMessage', {      //hub topology ... btb3t el msg L kolu beek nta kman
            from: message.from,
            text: message.text,
            createdAt: new Date().toLocaleDateString()
        })
        callback('This is from the server')
        //socket.broadcast.emit('newMessage', generateMessage(message.from, message.text))  //router topology ... btbt3t el msg L kolu ela enta
    })

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    })

    socket.on('disconnect', (socket) => {
        console.log('One User Disconnected !')
    })
})


server.listen(port, () => {
    console.log(`Server starting at port ${port} ...`)
})
