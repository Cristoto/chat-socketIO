const socket = io();
let hasUsername = false;
let hasMessage = false;
let canSend = false;

$('#send').prop('disabled', true);

//Events
$('#message').keyup(() => {
    if ($('#message').val().trim()) {
        hasMessage = true;
    } else {
        hasMessage = false;
    }
    checkInputs();
});

$('#username').keyup(() => {
    if ($('#username').val().trim()) {
        hasUsername = true;
    } else {
        hasUsername = false;
    }
    checkInputs();
});

$('#send').click(() => {
    socket.emit('chat:message', {
        message: $('#message').val(),
        username: $('#username').val()
    });
});

$('#message').keypress(() => {
    socket.emit('chat:typing', $('#username').val());
});

//Preparing the message of server
socket.on('chat:message', (data) => {
    $('#actions').html('');
    $('#output').append(`<p><strong>${data.username}</strong>: ${data.message}</p>`);
});

socket.on('chat:typing', (username) => {
    $('#actions').html(`<p><em>${username} is typing a message.</em></p>`);
});

var checkInputs = () => {
    if (hasMessage && hasUsername) {
        $('#send').prop('disabled', false);
    } else {
        $('#send').prop('disabled', true);
    }


}