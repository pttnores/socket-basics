var socket = io();
var room = getQueryVariable('room') || 'general';
var name = getQueryVariable('name') || 'Anonymous';

socket.on('connect', function () {
    console.log('Connected to the server');
});

socket.on('message', function (newMessage) {
    console.log('New message: ' + newMessage.text);
    var momentTimestamp = moment.utc(newMessage.timestamp);
    var message = jQuery('.messages');
    console.log(newMessage);
    message.append('<p><strong style="font-weight: bold">' + newMessage.name + ' ' +momentTimestamp.local().format("h:mm a") + '</strong>:');
    message.append(' ' + newMessage.text + '</p>');
});

// Handle submitting
var $form = jQuery('#message-form');

$form.on('submit', function () {
    event.preventDefault();

    var message = $form.find('input[name=message]');

    socket.emit('message', {
        text: message.val(),
        name: name
    });
    message.val('');
});