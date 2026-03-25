const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello! This app is running inside a Docker Container.');
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});