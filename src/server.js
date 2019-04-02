const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, '../build')));

app.get('/api/v1/hello', (req, res) => {
  setTimeout(() => {
    res.status(200).json('James');
  }, 1000)
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(9000);
