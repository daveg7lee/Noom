import express from 'express';
import SocketIO from 'socket.io';
import http from 'http';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (req, res) => res.render('home'));
app.get('/*', (req, res) => res.redirect('/'));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const io = SocketIO(server);

io.on('connection', (socket) => {
  socket.on('enter_room', (msg) => console.log(msg));
});

server.listen(3000, handleListen);
