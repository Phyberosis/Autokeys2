const { U } = require('win32-api')
const user32 = U.load()
const ref = require('ref-napi')
const { app, BrowserWindow, ipcMain } = require('electron')

function createWindow () {
  console.log("init on " + process.platform)
  if (process.platform != "win32")
  {
    process.exit();
  }

  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('app/index.html')
  win.webContents.openDevTools()
}

// ipcMain.on('asynchronous-message', (event, arg) => {
//     console.log(arg) // prints "ping"
//     event.reply('asynchronous-reply', 'pong')
// })
  
// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log(arg) // prints "ping"
//   event.returnValue = 'pong'
// })

let hwnd = 0;

ipcMain.on('send', (event, arg) =>
{
  setTimeout( () =>
  {
    // let parent = user32.GetForegroundWindow();

    // let name = 'Calculator\0';
    // let nameB = Buffer.from(name, 'ucs2');
    // let parent = user32.FindWindowExW(0, 0, null, nameB)
    user32.SendMessageW(hwnd, 0x100, 0x0008, 0)
    user32.SendMessageW(hwnd, 0x101, 0x0008, 0)
    console.log("send")
  }, 0);
})

ipcMain.on( 'set', (e, a)=>
{
  setTimeout(() => {
    hwnd = user32.GetForegroundWindow();
    let name = 'Edit\0';
    let nameB = Buffer.from(name, 'ucs2');
    hwnd = user32.FindWindowExW(0, 0, null, nameB)
    let buf = Buffer.alloc(256);
    user32.GetWindowTextW(hwnd, buf, buf.length)
    let n = buf.toString('ucs2');
    console.log("set to " + n + "\n")
    e.reply('lbl', n);
  }, 1500);
})

app.whenReady().then(createWindow)