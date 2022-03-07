require('dotenv').config();

const express = require('express');
const http = require('http');
const socketio =  require('socket.io');
const cors = require('cors');
const { addUser, getUser, removeUser, getRoomUsers } = require('./user');

const PORT = process.env.PORT;

const app = express();

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  console.log('we have new connection!!!! gag jan  ');
  socket.on('join', ({ name, room }, callback) => {
    console.log(name,room);
    const { error, user } = addUser({ id: socket.id, name, room });
    console.log(addUser({ id: socket.id, name, room }));
    if(error) return callback(error);

    console.log(user);
    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getRoomUsers(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });
    callback();
  });
  socket.on('disconnect', () => {
    console.log('user had left');
  });
});


server.listen(process.env.PORT, () => console.log(`server is running on port ${PORT} `));
