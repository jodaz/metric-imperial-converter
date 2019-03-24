'use strict';

// Import dependencies
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const routes = require('./routes/api');
const port = 4000;

app.use(cors());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());

app.use(express.static('public'));
app.use(routes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

// Start server
app.listen(port, () => { console.log(`Listening on port ${port}`) });
module.exports = app;
