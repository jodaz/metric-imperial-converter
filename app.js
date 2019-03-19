'use strict';

// Import dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

// Start server
app.listen(port, () => { console.log(`Listening on port ${port}`) });
