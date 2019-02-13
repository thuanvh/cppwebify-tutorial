const {ipcRenderer} = require('electron')

const saveBtn = document.getElementById('gen-key-button')
saveBtn.addEventListener('click', (event) => {  
  ipcRenderer.send('save-dialog')  
})

ipcRenderer.on('saved-file', (event, path) => {
  if (!path) path = 'No path'
  document.getElementById('gen-file-saved').innerHTML = `Path selected: ${path}`
})


