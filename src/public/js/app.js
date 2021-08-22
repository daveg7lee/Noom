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
  const input = room.querySelector('#msg input');
  socket.emit('new_message', input.value, roomName, () => {
    addMsg(`You: ${input.value}`);
    input.value = '';
  });
};

const showRoom = () => {
  const h3 = room.querySelector('h3');
  const msgForm = room.querySelector('form');
  welcome.hidden = true;
  room.hidden = false;
  h3.innerHTML = `Room ${roomName}`;
  msgForm.addEventListener('submit', handleMsgSubmit);
};

const handleWelcomeSubmit = (e) => {
  e.preventDefault();
  const roomNameInput = form.querySelector('#roomName');
  const nicknameInput = form.querySelector('#nickname');
  socket.emit('nickname', nicknameInput.value);
  socket.emit('enter_room', roomNameInput.value, showRoom);
  roomName = roomNameInput.value;
  nickname = nicknameInput.value;
  roomNameInput.value = '';
  nicknameInput.value = '';
};

form.addEventListener('submit', handleWelcomeSubmit);

socket.on('welcome', (nickname) => {
  addMsg(`${nickname} joined`);
});

socket.on('bye', (nickname) => {
  addMsg(`${nickname} left`);
});

socket.on('new_message', addMsg);

socket.on('room_change', (rooms) => {
  const roomList = welcome.querySelector('ul');
  roomList.innerHTML = '';
  rooms.forEach((room) => {
    const li = document.createElement('li');
    li.innerText = room;
    roomList.appendChild(li);
  });
});
