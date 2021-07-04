module.exports = function webSocket(io) {
    let userToGroup = {};
    // Should be in the structure {name: 'xxxxxx', count: xxx}
    let onlineCount = [];

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

        socket.on('join-room', (room, username) => {
            console.log('Room joined', room, userToGroup, onlineCount);
            
            if (userToGroup[username]) {
                //The user already existed in a previous group
                let prevGroupName = userToGroup[username];

                //Decrement online count of the previous group by 1
                onlineCount = onlineCount.map(item => {
                    if (item.name === prevGroupName) {
                        item.count--;
                    }
                    return item;
                })

                //Leave the previous group
                socket.leave(prevGroupName);
            }
            //Add the user to the new group
            userToGroup[username] = room;

            //increase the online count of the group
            let roomWithCount = onlineCount.find(item => {
                return item.name === room;
            });

            if (roomWithCount) {
                //Provided the room already has joined users, increment the online count by 1
                onlineCount = onlineCount.map(item => {
                    if (item.name === room) {
                        item.count++;
                    }
                    return item;
                })
            } else {
                //Huuh...first joiner of the room, add the room object
                onlineCount.push({name: room, count: 1});
            }

            // Finally, join the room
            socket.join(room);
            io.emit('update_online_list', onlineCount);
        });

        socket.on('leave-room', username => {
            let prevGroup = userToGroup[username];
            console.log(`${username} is leaving room: ${prevGroup}`);

            if (prevGroup) {
                delete userToGroup[username];

                onlineCount = onlineCount.map(item => {
                    if (item.name === prevGroup) {
                        item.count--;
                    }
                    return item;
                })
                socket.leave(prevGroup);
                io.emit('update_online_list', onlineCount);
            }
        })
    })    
}
