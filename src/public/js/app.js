const socket = io();

const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');
const room = document.getElementById('room');

room.hidden = true;

let roomName;

const addMsg = (msg) => {
  const ul = room.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = msg;
  ul.appendChild(li);
};

const handleMsgSubmit = (e) => {
  e.preventDefault();
  const input = room.querySelector('input');
  socket.emit('new_message', input.value, roomName, () => {
    addMsg(`You: ${input.value}`);
    input.value = '';
  });
};

const showRoom = () => {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector('h3');
  h3.innerHTML = `Room ${roomName}`;
  const form = room.querySelector('form');
  form.addEventListener('submit', handleMsgSubmit);
};

const handleRoomSubmit = (e) => {
  e.preventDefault();
  const input = form.querySelector('input');
  socket.emit('enter_room', input.value, showRoom);
  roomName = input.value;
  input.value = '';
};

form.addEventListener('submit', handleRoomSubmit);

socket.on('welcome', () => {
  addMsg('Someone joined');
});

socket.on('bye', () => {
  addMsg('Someone left');
});

socket.on('new_message', addMsg);
