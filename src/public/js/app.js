const socket = io();

const myFace = document.getElementById('myFace');
const muteButton = document.getElementById('mute');
const cameraButton = document.getElementById('camera');
const camerasSelect = document.getElementById('cameras');

let myStream;
let muted = false;
let cameraOff = false;

async function getCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === 'videoinput');
    cameras.forEach((camera) => {
      const option = document.createElement('option');
      option.value = camera.deviceId;
      option.innerText = camera.label;
      camerasSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}

async function getMedia() {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    myFace.srcObject = myStream;
    await getCameras();
    console.log(myStream);
  } catch (e) {
    console.log(e);
  }
}

getMedia();

function handleMuteClick() {
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (!muted) {
    muteButton.innerText = 'Unmute';
    muted = true;
  } else {
    muteButton.innerText = 'Mute';
    muted = false;
  }
}

function handleCameraClick() {
  myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));
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
