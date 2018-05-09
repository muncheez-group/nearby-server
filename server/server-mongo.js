const mongoose = require('mongoose');
const mongoUrlDocker = 'mongodb://database/apateez-nearby';
const mongoUrl = 'mongodb://localhost/apateez-nearby';
const db = require('../db/mongodb.js');

mongoose.connect(mongoUrl); // mongoose.connect(mongoUrlDocker);
mongoose.connection.on('connected', () => {
  console.log('Mongoose connection open');
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error: ${err}`);
  mongoose.connect(mongoUrlDocker);
});

let queryMongo = (req, res) => {
  const placeId = req.params.id;

  const results = [];
  db.findOne(placeId, (err, data) => {
    if (err) {
      res.status(500);
      console.log(err);
    } else {
      const nearbyArr = data[0].nearby;
      results.push(data[0]);

      db.findMany(nearbyArr, (err, data) => {
        if (err) {
          res.status(500);
          console.log(err);
        } else {
          results.push(data);
          res.status(200);
          res.send(results);
        }
      });
    }
  });
};

module.exports = queryMongo;