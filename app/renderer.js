const { ipcRenderer } = require('electron')

ipcRenderer.on('lbl', (event, arg) => {
  console.log(arg) // prints "pong"
  printLabel(">"+ arg+"<");
})

// ipcRenderer.send('asynchronous-message', 'ping')

function setWind()
{
  console.log("set");
  ipcRenderer.send('set');
}

function sendKey()
{
  console.log("send");
  ipcRenderer.send("send");
}

function printLabel(s)
{
  document.getElementById("lbl").innerHTML = s;
}