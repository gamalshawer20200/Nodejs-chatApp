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
    console.log('message', message) //client side consle chorme ctrl+shift+i -> console
    var li = jQuery('<li></li>');
    li.text(`${message.from} : ${message.text}`)

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>')
    var a = jQuery('<a target="_blank">My current location</a>')
    li.text(`${message.from}: `)
    a.attr('href', message.url)  //a.attr('target') => it will print its value which is currently target
    li.append(a)
    jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]')

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function (data) {
        messageTextbox.val('')
    })
})

var locationButton = jQuery('#send-location')
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser !')
    }

    locationButton.attr('disabled','disabled').text('Sending location...')  

    navigator.geolocation.getCurrentPosition(function (position) {
        //console.log(position);
        locationButton.removeAttr('disabled').text('Send location')                
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        alert('Unable to fetch location !')
        locationButton.removeAttr('disabled').text('Send location')       
    })
});



// socket.emit('createMessage', {
//     from: 'Jemi',
//     text: 'Hi'
// }, function (data) {
//     console.log('Got IT', data) // da el Aknowledgement ele howa e4ta ana estalamt resaltak go on kamel 4uf enta 3ayz t3ml eh b3d kda w da el server howa ele byb3atu f el callback 
// }) 


