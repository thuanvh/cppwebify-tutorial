const {ipcRenderer} = require('electron')
// gen key
const saveBtn = document.getElementById('gen-key-button')
saveBtn.addEventListener('click', (event) => {  
  ipcRenderer.send('save-dialog')  
})

ipcRenderer.on('saved-file', (event, path) => {
  if (!path) path = 'No path'
  document.getElementById('gen-file-saved').innerHTML = `Key pair save to: ${path}`
  document.getElementById('load-key-pub').innerHTML = `${path}.pub`
  document.getElementById('load-key-private').innerHTML = `${path}.key`
})
// load key
document.getElementById('load-key-button').addEventListener('click', (event) => {  
  ipcRenderer.send('load-key-dialog')  
})
document.getElementById('load-pub-key-button').addEventListener('click', (event) => {  
  ipcRenderer.send('load-pub-key-dialog')  
})
ipcRenderer.on('load-key-file', (event, path) => {
  if (!path) path = 'No path'    
  document.getElementById('load-key-private').innerHTML = `${path}`
})
ipcRenderer.on('load-pub-key-file', (event, path) => {
  if (!path) path = 'No path'  
  document.getElementById('load-key-pub').innerHTML = `${path}`  
})
// encrypt text
document.getElementById('encrypt-text-button').addEventListener('click', (event) => {  
  //alert(document.getElementById('text-input-plain').value);
  ipcRenderer.send('encrypt-text', 
    [document.getElementById('text-input-plain').value,
    document.getElementById('load-key-pub').innerHTML]
    ); 
})
ipcRenderer.on('encrypt-text-finish', (event, path) => {
  if (!path) path = 'No path'  
  document.getElementById('text-output-encrypted').innerHTML = `${path}`  
})
// decrypt text
document.getElementById('decrypt-text-button').addEventListener('click', (event) => {
  // alert(document.getElementById('text-input-encrypted2'));
  // alert(document.getElementById('text-input-encrypted2').value);
  // alert(document.getElementById('text-input-encrypted2').value);
  // alert(document.getElementById('load-key-private').innerHTML);
  ipcRenderer.send('decrypt-text', 
    [document.getElementById('text-input-encrypted2').value,
    document.getElementById('load-key-private').innerHTML]
    ); 
})
ipcRenderer.on('decrypt-text-finish', (event, path) => {
  if (!path) path = 'No path'  
  document.getElementById('text-output-plain').innerHTML = `${path}`  
})
// encrypt file
document.getElementById('input-file-button').addEventListener('click', (event) => {  
  ipcRenderer.send('load-file-plain-dialog')
})
ipcRenderer.on('load-file-plain', (event, path) => {
  if (!path) path = 'No path'    
  document.getElementById('input-file-plain').innerHTML = `${path}`
})
document.getElementById('output-file-button').addEventListener('click', (event) => {  
  ipcRenderer.send('encrypt-file', [document.getElementById('input-file-plain').innerHTML,
    document.getElementById('load-key-pub').innerHTML]
  )
})
ipcRenderer.on('encrypt-file-finish', (event, path) => {
  if (!path) path = 'No path'  
  document.getElementById('output-file-encrypted').innerHTML = `${path}`  
})

// decrypt file
document.getElementById('d-input-file-button').addEventListener('click', (event) => {  
  ipcRenderer.send('load-file-encrypted-dialog')
})
ipcRenderer.on('load-file-encrypted', (event, path) => {
  if (!path) path = 'No path'    
  document.getElementById('input-file-encrypted').innerHTML = `${path}`
})
document.getElementById('d-output-file-button').addEventListener('click', (event) => {  
  ipcRenderer.send('decrypt-file', [document.getElementById('input-file-encrypted').innerHTML,
    document.getElementById('load-key-private').innerHTML]
  )
})
ipcRenderer.on('decrypt-file-finish', (event, path) => {
  if (!path) path = 'No path'  
  document.getElementById('output-file-plain').innerHTML = `${path}`  
})
