var socket = io();

function scrollToBottom() {
    // Selectors
    var messages = jQuery('#messages')
    var newMessage = messages.children('li:last-child')

    // Heights
    var clientHeight = messages.prop('clientHeight')
    var scrollTop = messages.prop('scrollTop')
    var scrollHeight = messages.prop('scrollHeight')
    var newMessageHeight = newMessage.innerHeight()
    var lastMessageHeight = newMessage.prev().innerHeight()

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight)
    }
}

socket.on('connect', function () {
    //console.log('Connected to the server !')
    var params = jQuery.deparam(window.location.search)

    socket.emit('join', params, function (err) {
        if (err) {
            alert(err)
            window.location.href = '/'
        } else {
            console.log('No error')
        }
    });
    // socket.emit('createMessage', {
    //     from: 'Jemi@example.com',
    //     text: 'Welcome back iam New here !'
    // })
});

socket.on('disconnect', function () {
    console.log('Disconnected From The Server')
});

socket.on('newMessage', function (message) {
    var formatedTime = moment(message.createdAt).format('h:mm a')
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formatedTime
    });

    jQuery('#messages').append(html)
    scrollToBottom();

    // console.log('message', message) //client side consle chorme ctrl+shift+i -> console
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formatedTime} : ${message.text}`)

    // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var formatedTime = moment(message.createdAt).format('h:mm a')
    var template = jQuery('#location-template').html()
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formatedTime
    })

    jQuery('#messages').append(html)
    scrollToBottom();

    // var li = jQuery('<li></li>')
    // var a = jQuery('<a target="_blank">My current location</a>')
    // li.text(`${message.from} ${formatedTime}: `)
    // a.attr('href', message.url)  //a.attr('target') => it will print its value which is currently target
    // li.append(a)
    // jQuery('#messages').append(li);
})

socket.on('updateUserList', function (users) {
    var ol = jQuery('<ol></ol>');

    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user))
    });
    jQuery('#users').html(ol)
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

    locationButton.attr('disabled', 'disabled').text('Sending location...')

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

// 29.9840302,31.287633399999997
