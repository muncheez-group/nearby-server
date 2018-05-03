let faker = require('faker');
let fs = require('fs');
let data = [];
const total = 10000000;
console.log('starting');
let generate = (writer, encoding, callback) => {
  let i = total;
  let write = () => {
    let ok = true;
    do {
      let data = {
        name: faker.address.city() + faker.address.streetName(),
        place_id: i,
        google_rating: (Math.random() * 4 + 1).toFixed(1),
        zagat_rating: (Math.random() * 4 + 1).toFixed(1),
        photos: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
        neighborhood: faker.address.streetName() + faker.address.citySuffix(), 
        price_level: Math.floor((Math.random() * 4 + 1)),
        types: faker.lorem.word(),
        nearby: [Math.floor(Math.random() * total), Math.floor(Math.random() * total), Math.floor(Math.random() * total),
          Math.floor(Math.random() * total), Math.floor(Math.random() * total), Math.floor(Math.random() * total)]
      };
      i--;
      if (i === 0) { // end
        writer.write(JSON.stringify(data) + ']', encoding, callback);
      } else if (i === total - 1) { // start
        ok = writer.write('[' + JSON.stringify(data) + ',', encoding);
      } else {
        ok = writer.write(JSON.stringify(data)+',');
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}
generate (fs.createWriteStream('data.json','utf8', () => {
  console.log('Finished!');
}));

