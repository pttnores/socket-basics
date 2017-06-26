var socket = io();

socket.on('connect', function () {
    console.log('Connected to the server');


    socket.on('message', function (message) {
        console.log('Message received: ' + message.text);
        socket.broadcast.emit('message',{
            text: 'Welcome to the chat application'
        });
    });

    socket.emit('message',{
        text: 'Welcome to the chat application'
    });
});

socket.on('message', function (message) {
    console.log('New message: ' + message.text);
});