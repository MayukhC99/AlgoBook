module.exports = function webSocket(io) {
    io.on('connection', (socket) => {
        console.log(socket.id);
    })    
}
