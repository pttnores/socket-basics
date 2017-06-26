var socket = io();

socket.on('connect', function () {
    console.log('Connected to the server');
});

socket.on('message', function (message) {
    console.log('New message: ' + message.text);
});

// Handle submitting
var $form = jQuery('#message-form');

$form.on('submit', function () {
    event.preventDefault();

    var message = $form.find('input[name=message]');

    socket.emit('message',{
        text: message.val()
    });
    message.val('');
});