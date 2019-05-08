var socket = io();

socket.on('connect', function () {
    console.log('Connected to the server !')

    // socket.emit('createMessage', {
    //     from: 'Jemi@example.com',
    //     text: 'Welcome back iam New here !'
    // })
});

socket.on('disconnect', function () {
    console.log('Disconnected From The Server')
});

socket.on('newMessage', function (message) {
    console.log('message', message) //client side consle chorme ctrl+i -> console
    var li = jQuery('<li></li>');
    li.text(`${message.from} : ${message.text}`)

    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message').val()
    }, function () {

    })
})

// socket.emit('createMessage', {
//     from: 'Jemi',
//     text: 'Hi'
// }, function (data) {
//     console.log('Got IT', data) // da el Aknowledgement ele howa e4ta ana estalamt resaltak go on kamel 4uf enta 3ayz t3ml eh b3d kda w da el server howa ele byb3atu f el callback 
// }) 


