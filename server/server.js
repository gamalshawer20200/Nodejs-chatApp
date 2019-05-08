const path = require('path')
const http = require('http')
const express = require('express')
const SocketIo = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;
var app = express()
var server = http.createServer(app)
var io = SocketIo(server)
// console.log(__dirname+ '/../public')
// console.log(publicPath)


app.use(express.static(publicPath))

io.on('connection', (socket) => {  //allows you to listen to an event and do something when this event happens
    console.log('New User Connected')

    // socket.emit('newEmail', {
    //     from: 'newEmail@example.com',
    //     text: 'Hey, what is going on',
    //     createdAt: 123
    // })
    socket.emit('newMessage', {
        from: 'newMessage@example.com',
        text: 'Hello every one to the chat-room from SERVER !'
    })

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail', newEmail)
    //     // console.log('This E-mail well sent to -> ', newEmail.to)
    // })

    socket.on('createMessage', (message) => {
        console.log('Message',message)
    })

    socket.on('disconnect', (socket) => {
        console.log('One User Disconnected !')
    })
})


server.listen(port, () => {
    console.log(`Server starting at port ${port} ...`)
})
