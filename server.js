require('dotenv').config();

const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const PORT = process.env.PORT;

const app = express();
const server = http.createServer(app);

const io = socketio(server);
io.on('connection', socket => {
  console.log('we have new connection!!!! gag jan  ');

  io.on('disconnect',()=>{
    console.log('user had left')
  })
});

server.listen(PORT, () => console.log(`server is running on port ${PORT} `));
