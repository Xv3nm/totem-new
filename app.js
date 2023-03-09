const express = require('express');

const app = express()
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'source/index.html'));
});

app.listen(PORT, console.log('App Listening to port ' + PORT));