var socket = io();
//var moment = moment();

socket.on('connect', function () {
    console.log('Connected to the server');
});

socket.on('message', function (message) {
    console.log('New message: ' + message.text);
    var momentTimestamp = moment.utc(message.timestamp);
    jQuery('.messages').append('<p>' +
        '<strong style="font-weight: bold">' + momentTimestamp.local().format("h:mm a") + '</strong>: ' +
        message.text +
        '</p>');
});

// Handle submitting
var $form = jQuery('#message-form');

$form.on('submit', function () {
    event.preventDefault();

    var message = $form.find('input[name=message]');

    socket.emit('message', {
        text: message.val()
    });
    message.val('');
});