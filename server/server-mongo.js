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
  console.log(`GET ${req.url}`);

  const results = [];
  db.findOne(placeId, (err, data) => {
    if (err) {
      res.status(500);
      console.log(err);
    } else {
      console.log('restaurant info: ', data);
      const nearbyArr = data[0].nearby;
      console.log('Nearby Arr: ', nearbyArr);
      results.push(data[0]);

      db.findMany(nearbyArr, (err, data) => {
        if (err) {
          res.status(500);
          console.log(err);
        } else {
          console.log('recommended restaurants:', data);
          results.push(data);
          console.log(`number of recommended: ${data.length}`);
          res.status(200);
          console.log('Results Length: ', results.length);
          res.send(results);
        }
      });
    }
  });
};

module.exports = queryMongo;