const messageForm = document.querySelector('form');
const messageList = document.querySelector('ul');
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener('open', () => {
  console.log('Connected to Server');
});

socket.addEventListener('message', (message) => {
  const p = document.createElement('p');
  p.innerHTML = message.data;
  messageList.appendChild(p);
});

socket.addEventListener('close', () => {
  console.log('Connection Closed');
});

function handleSubmit(e) {
  e.preventDefault();
  const input = messageForm.querySelector('input');
  socket.send(input.value);
  input.value = '';
}

messageForm.addEventListener('submit', handleSubmit);
