var socket = io();
var room = getQueryVariable('room') || '';
var name = getQueryVariable('name') || 'Anonymous';

jQuery('.room-title').text(room);

socket.on('connect', function () {
    console.log('Connected to the server');
    socket.emit('joinRoom', {
        room: room,
        name: name
    });
});

socket.on('message', function (newMessage) {
    console.log('New message: ' + newMessage.text);
    var momentTimestamp = moment.utc(newMessage.timestamp);
    var $messages = jQuery('.messages');
    var $message = jQuery('<li class="list-group-item"></li>');
    console.log(newMessage);
    $message.append('<strong style="font-weight: bold">' + newMessage.name + ' ' +momentTimestamp.local().format("h:mm a") + '</strong>:');
    $message.append(' ' + newMessage.text);
    $messages.append($message);
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