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

    // socket.emit('newMessage', {
    //     from: 'serverGM@example.com',
    //     text: 'Hello every one to the chat-room from SERVER !',
    //     createdAt: 123
    // })

    socket.on('createMessage', (message) => {
        console.log('Message', message)
        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().toLocaleDateString()
        // })
        socket.broadcast.emit('newMessage',{
            from: message.from,
            text: message.text,
            createdAt: new Date().toLocaleDateString()
        })
    })

    socket.on('disconnect', (socket) => {
        console.log('One User Disconnected !')
    })
})


server.listen(port, () => {
    console.log(`Server starting at port ${port} ...`)
})
