const AllData = require('./195-Zagat-AllData.json');
const db = require('./db/mongodb.js');
const mongoose = require('mongoose');

const mongoUrlDocker = 'mongodb://database/apateez-nearby';
const mongoUrl = 'mongodb://localhost/apateez-nearby';

mongoose.connect(mongoUrl);
// mongoose.connect(mongoUrlDocker);

mongoose.connection.on('connected', () => {
  console.log('Mongoose connection open');
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error: ${err}`);
  mongoose.connect(mongoUrlDocker);
});

const seedDb = (array) => {
  let counter = 0;

  const createList = () => {
    const photoArr = array[counter].result.photos.map(photo => photo.photo_reference);

    // 6 random restaurants for near by suggestion of each restaurant;
    const nearbyArr = [];
    for (let i = 0; i < 6; i += 1) {
      nearbyArr.push(array[Math.floor(Math.random() * 100)].result.place_id);
    }

    const obj = {
      name: array[counter].result.name,
      place_id: array[counter].result.place_id,
      google_rating: array[counter].result.rating,
      zagat_rating: array[counter].result.reviews[0].rating,
      photos: photoArr,
      neighborhood: array[counter].result.address_components[2].long_name,
      price_level: array[counter].result.price_level,
      types: array[counter].result.types[1],
      nearby: nearbyArr,
    };

    console.log('Restaurant OBJ: ', obj);

    db.insertOne(obj, (err, content) => {
      if (err) {
        console.log('ERROR IS', err);
      } else {
        console.log('CONTENT is ', content);
        counter += 1;
        if (counter < 100) {
          createList();
        } else {
          console.log('Saved 100 Data into DB!');
          mongoose.disconnect();
        }
      }
    });
  };

  db.clearDb(() => createList());
};

seedDb(AllData);
