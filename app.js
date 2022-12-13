const express = require('express');
// ctrl+shitf+k for delete line
require('dotenv').config();
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/process', (req, res) => {
  res.send(process.env.PORT);
});
app.get('*', (req, res) => {
  res.send(
    `<div><h1>OOPS!</h1>You've found a page that doesn't exit.</p> <a href='/'> Go Back</a></div>`
  );
});

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });
// io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//   });
// });
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
server.listen(process.env.PORT, () => {
  console.log(`seeing... ${process.env.PORT}`);
});
