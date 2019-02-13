const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let window = null

// Wait until the app is ready
app.once('ready', () => {
  // Create a new window
  window = new BrowserWindow({
    // Set the initial width to 800px
    width: 800,
    // Set the initial height to 600px
    height: 600,
    // Set the default background color of the window to match the CSS
    // background color of the page, this prevents any white flickering
    backgroundColor: "#D6D8DC",
    // Don't show the window until it's ready, this prevents any white flickering
    show: false
  })

  // Load a URL in the window to the local index.html path
  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Show window when page is ready
  window.once('ready-to-show', () => {
    window.show()
  })
})

const {ipcMain, dialog} = require('electron')

ipcMain.on('save-dialog', (event) => {
  //alert("open dialog")
  // const options = {
  //   title: 'Save an Image',
  //   filters: [
  //     { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
  //   ]
  // }
  dialog.showSaveDialog((filename) => {
    console.log("begin generate key ...");
    var execFile = require('child_process').execFile
    var program = "../cpp/build/crypto";
    //var under = parseInt(req.body.under);
    var child = execFile(program, ["genkey", "ecc", filename + ".key", filename + ".pub"],
      function (error, stdout, stderr) {
        console.log(stdout);
        var primes = stdout.split("\n").slice(0, -3).map(function (line) {return parseInt(line);});
      }
    );
    event.sender.send('saved-file', filename)
  })
})