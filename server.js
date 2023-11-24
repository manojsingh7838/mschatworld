const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Socket 
io.on('connection', (socket) => {
    console.log(' user Connected...');
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    });
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
