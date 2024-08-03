const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "https://vc-frontend-ten.vercel.app", // Allow only your frontend origin
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors({
  origin: "https://vc-frontend-ten.vercel.app", // Allow only your frontend origin
  methods: ["GET", "POST"],
  credentials: true
}));

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

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
