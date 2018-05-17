require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const query = require('./server-postgres.js');

const app = express();

// const query = require('./server-mongo.js')

app.listen(3004, () => { console.log('Apateez app listening on port 3004!'); });
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('http://52.53.171.51:3004/restaurants/', express.static(path.join(__dirname, '../client/dist')));

app.get('http://52.53.171.51:3004/restaurants/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get('http://52.53.171.51:3004/api/restaurants/:id/nearby', query);