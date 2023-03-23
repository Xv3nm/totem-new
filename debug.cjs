const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile('/workspaces/totem-new/index.html')
})

app.get('/styles.css', (req, res) => {
  res.sendFile('/workspaces/totem-new/styles.css')
})

app.get('/script.js', (req, res) => {
  res.sendFile('/workspaces/totem-new/script.js')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})