import express from 'express';
import WebSocket from 'ws';
import http from 'http';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (req, res) => res.render('home'));
app.get('/*', (req, res) => res.redirect('/'));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let sockets = [];

wss.on('connection', (socket) => {
  sockets.push(socket);
  socket.on('message', (message) => {
    sockets.forEach((aSocket) => {
      if (aSocket !== socket) {
        aSocket.send(message);
      }
    });
  });
  socket.on('close', () => {
    sockets = sockets.filter((element) => element !== socket);
  });
  socket.send('Welcome to our Chat');
});

server.listen(3000, handleListen);
