const faker = require('faker');
const fs = require('fs');

const total = 100;
console.log('starting');
const generate = (writer, encoding, callback) => {
  let i = total;
  const write = () => {
    let ok = true;
    do {
      const data = {
        name: faker.address.city() + faker.address.streetName(),
        place_id: i,
        google_rating: ((Math.random() * 4) + 1).toFixed(1),
        zagat_rating: ((Math.random() * 4) + 1).toFixed(1),
        photos: Array.from({length: 4}, ()=> Math.floor(Math.random() * 100)),
        neighborhood: faker.address.streetName() + faker.address.citySuffix(),
        price_level: Math.floor(((Math.random() * 4) + 1)),
        types: faker.lorem.word(),
        nearby: Array.from({length: 6}, ()=> Math.floor(Math.random() * total)),
      };
      i -= 1;
      for (let property in data) {
        if (property === 'photos') {
          ok = writer.write(`${JSON.stringify(data[property])},`);
        } else if (property === 'nearby') {
          ok = writer.write(JSON.stringify(data[property]));
        }
        else {
          ok = writer.write(`${(data[property])},`);
        }
      }
      writer.write('\n');
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  };
  write();
};
generate(fs.createWriteStream('data-nearby.csv', 'utf8', () => {
  console.log('Finished!');
}));

module.exports.generate;