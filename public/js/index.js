var socket = io();

socket.on('connect', function () {
    console.log('Connected to the server !')

    // socket.emit('createMessage', {
    //     from: 'Jemi@example.com',
    //     text: 'Welcome back iam New here !'
    // })
});

socket.on('newMessage', function (message) {
    console.log('message', message)
});

socket.on('newArrival', function (message) {
    console.log('message',message)
});

socket.on('disconnect', function () {
    console.log('Disconnected From The Server')
});
