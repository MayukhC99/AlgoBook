module.exports = function webSocket(io) {
    io.on('connection', (socket) => {
        console.log(socket.id);

        socket.on('send-message', (message, room) => {
            console.log('Message received', message, room);
            if (room) {
                socket.to(room).emit('receive-message', message, room);
            } else {
                socket.broadcast.emit('receive-message', message, room);
            }
        })

        socket.on('join-room', room => {
            console.log('Room joined', room);
            socket.join(room);
        })
    })    
}
