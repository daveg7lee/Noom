const socket = io();

const myFace = document.getElementById('myFace');
const muteButton = document.getElementById('mute');
const cameraButton = document.getElementById('camera');

let myStream;
let muted = false;
let cameraOff = false;

async function getMedia() {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });
    myFace.srcObject = myStream;
    console.log(myStream);
  } catch (e) {
    console.log(e);
  }
}

getMedia();

function handleMuteClick() {
  if (!muted) {
    muteButton.innerText = 'Unmute';
    muted = true;
  } else {
    muteButton.innerText = 'Mute';
    muted = false;
  }
}

function handleCameraClick() {
  if (cameraOff) {
    cameraButton.innerText = 'Turn Camera Off';
    cameraOff = false;
  } else {
    cameraButton.innerText = 'Turn Camera On';
    cameraOff = true;
  }
}

muteButton.addEventListener('click', handleMuteClick);
cameraButton.addEventListener('click', handleCameraClick);
