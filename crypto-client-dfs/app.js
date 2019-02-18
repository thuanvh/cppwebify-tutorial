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
ipcMain.on('load-key-dialog', (event) => {
  //alert("open dialog")
  const options = {
    title: 'Load private key',
    filters: [
      { name: 'Key', extensions: ['key'] }
    ]
  }
  dialog.showOpenDialog(options, (filename) => {
    console.log("load private key ...");
    event.sender.send('load-key-file', filename)
  })
})
ipcMain.on('load-pub-key-dialog', (event) => {
  //alert("open dialog")
  const options = {
    title: 'Load public key',
    filters: [
      { name: 'Key', extensions: ['pub'] }
    ]
  }
  dialog.showOpenDialog(options, (filename) => {
    console.log("load private key ...");
    event.sender.send('load-pub-key-file', filename)
  })
})
/// encrypt text
ipcMain.on('encrypt-text', (event, args) => {
  //alert("open dialog")
  console.log(args[0]);
  console.log(args[1]);
  var execFile = require('child_process').execFile
    var program = "../cpp/build/crypto";
    //var under = parseInt(req.body.under);
    var child = execFile(program, ["encrypt", "ecc", "text", args[0], args[1] ],
      function (error, stdout, stderr) {
        console.log(stdout);
        var primes = stdout.split("\n").slice(0, -3).map(function (line) {return parseInt(line);});
        event.sender.send('encrypt-text-finish', stdout)
      }
    );
  
})
/// encrypt text
ipcMain.on('decrypt-text', (event, args) => {
  //alert("open dialog")
  console.log("decrypt-text");
  console.log(args[0]);
  console.log(args[1]);
  var execFile = require('child_process').execFile
    var program = "../cpp/build/crypto";
    //var under = parseInt(req.body.under);
    var child = execFile(program, ["decrypt", "ecc", "text", args[0], args[1] ],
      function (error, stdout, stderr) {
        console.log(stdout);
        var primes = stdout.split("\n").slice(0, -3).map(function (line) {return parseInt(line);});
        event.sender.send('decrypt-text-finish', stdout)
      }
    );
  
})
/// encrypt file
ipcMain.on('load-file-plain-dialog', (event) => {
  //alert("open dialog")
  // const options = {
  //   title: 'Load private key',
  //   filters: [
  //     { name: 'Key', extensions: ['key'] }
  //   ]
  // }
  dialog.showOpenDialog((filename) => {
    console.log("load file plain ...");
    event.sender.send('load-file-plain', filename)
  })
})
ipcMain.on('encrypt-file', (event, args) => {  
  const options = {
     title: 'Save a file',
     filters: [
       { name: 'EncryptedFile', extensions: ['enc'] }
     ]
  }
  dialog.showSaveDialog(options, (filename) => {
    console.log("begin encrypt file ...");
    console.log(args[0])
    console.log(args[1])
    var execFile = require('child_process').execFile
    var program = "../cpp/build/crypto";
    //var under = parseInt(req.body.under);
    var child = execFile(program, ["encrypt", "ecc", "file", args[0], filename, args[1]],
      function (error, stdout, stderr) {
        console.log(stdout);
        var primes = stdout.split("\n").slice(0, -3).map(function (line) {return parseInt(line);});
        event.sender.send('encrypt-file-finish', filename);
      }
    );    
  })  
})

// Decrypt
ipcMain.on('load-file-encrypted-dialog', (event) => {
  //alert("open dialog")
  const options = {
    title: 'Load encrypted file',
    filters: [
      { name: 'EncryptedFile', extensions: ['enc'] }
    ]
  }
  dialog.showOpenDialog(options, (filename) => {
    console.log("load file encrypted ...");
    event.sender.send('load-file-encrypted', filename)
  })
})
ipcMain.on('decrypt-file', (event, args) => {  
  const options = {
     title: 'Save a file',
     filters: [
       { name: 'DecryptedFile', extensions: ['plain'] }
     ]
  }
  dialog.showSaveDialog(options, (filename) => {
    console.log("begin decrypt file ...");
    console.log(args[0])
    console.log(args[1])
    var execFile = require('child_process').execFile
    var program = "../cpp/build/crypto";
    //var under = parseInt(req.body.under);
    var child = execFile(program, ["decrypt", "ecc", "file", args[0], filename, args[1]],
      function (error, stdout, stderr) {
        console.log(stdout);
        var primes = stdout.split("\n").slice(0, -3).map(function (line) {return parseInt(line);});
        event.sender.send('decrypt-file-finish', filename);
      }
    );    
  })  
})
