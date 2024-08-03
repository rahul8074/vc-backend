const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://vc-frontend-phi.vercel.app", // Allow only your frontend origin
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors({
  origin: "https://vc-frontend-phi.vercel.app", // Allow only your frontend origin
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.static(path.join(__dirname, 'client/build')));

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('offer', (offer) => {
    console.log('Broadcasting offer');
    socket.broadcast.emit('offer', offer);
  });

  socket.on('answer', (answer) => {
    console.log('Broadcasting answer');
    socket.broadcast.emit('answer', answer);
  });

  socket.on('candidate', (candidate) => {
    console.log('Broadcasting candidate');
    socket.broadcast.emit('candidate', candidate);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
