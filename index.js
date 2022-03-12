// node server which will handle Socket.io connections  

// const io = require("socket.io")(8000)


const cors = require("cors")

const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });

const users = {}

io.on('connection', socket =>{
    socket.on('new-user-joined', namee =>{
        console.log("new-user", namee);
        users[socket.id] = namee;
        socket.broadcast.emit('user-joined', namee);
    });
    
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, namee: users[socket.id]})
        console.log("received message", message);
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
        // console.log("user-left", socket.id);
    });
});