require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const React = require('react');
const query = require('./server-postgres.js');
const ReactDOMServer = require('react-dom/server');
const app = express();

app.listen(3004, () => {
  console.log('Apateez app listening on port 3004!');
});
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/restaurants/', express.static(path.join(__dirname, '../client/dist')));
app.get('/loaderio-c49ed2afcef3746ba9ed136bf940670f', (req, res) => {
  res.sendFile(path.join(__dirname, '../loaderio-c49ed2afcef3746ba9ed136bf940670f.txt'));
});

app.get('/restaurants/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get('/api/restaurants/:id/nearby', query);