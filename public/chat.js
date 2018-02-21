// Make connection
var socket = io.connect('http://localhost:3000');

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback'),
      speak = document.getElementById('speak');

// Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

btn.addEventListener('click', function(){
    socket.emit('stream', {
        audio: true,
        video: false
    });
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

socket.on('stream', function(audio){

    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || 
    navigator.mozGetUserMedia || navigator.msgGetUserMedia);

    if(navigator.getUserMedia)
    {
        navigator.getUserMedia({audio : true}, function(stream){
            audio.src = window.URL.createObjectURL(stream);
            console.log("Speakers on")
        },
    function(err){
        throw err;
    });
}
});
