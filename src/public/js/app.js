const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener('open', () => {
  console.log('Connected to Server');
});

socket.addEventListener('message', (message) => {
  console.log(message.data);
});

socket.addEventListener('close', () => {
  console.log('Connection Closed');
});

setTimeout(() => {
  socket.send('Hello from the Browser');
}, 10000);
