const faker = require('faker');

const count = 5;
const generateTest = (total) => {
  const result = [];
  for (let i = 0; i < total; i += 1) {
    const data = {
      name: faker.address.city() + faker.address.streetName(),
      place_id: i,
      google_rating: ((Math.random() * 4) + 1).toFixed(1),
      zagat_rating: ((Math.random() * 4) + 1).toFixed(1),
      photos: Array.from({ length: 4 }, () => Math.floor(Math.random() * 100)),
      neighborhood: faker.address.streetName() + faker.address.citySuffix(),
      price_level: Math.floor(((Math.random() * 4) + 1)),
      types: faker.lorem.word(),
      nearby: Array.from({ length: 6 }, () => Math.floor(Math.random() * count)),
    };
    result.push(data);
  }
  return result;
};

describe('data generator', () => {
  it('has correct properties', () => {
    for (let i = 0; i < count; i += 1) {
      expect(generateTest(count)[i]).toHaveProperty('name');
      expect(generateTest(count)[i]).toHaveProperty('place_id');
      expect(generateTest(count)[i]).toHaveProperty('google_rating');
      expect(generateTest(count)[i]).toHaveProperty('zagat_rating');
      expect(generateTest(count)[i]).toHaveProperty('photos');
      expect(generateTest(count)[i]).toHaveProperty('neighborhood');
      expect(generateTest(count)[i]).toHaveProperty('price_level');
      expect(generateTest(count)[i]).toHaveProperty('types');
      expect(generateTest(count)[i]).toHaveProperty('nearby');
    }
  });
  it('has valid property types', () => {
    for (let i = 0; i < count; i += 1) {
      expect(typeof generateTest(count)[i].name === 'string');
      expect(generateTest(count)[i].place_id === 'number');
      expect(generateTest(count)[i].google_rating <= 4 && generateTest(count)[i].google_rating > 0);
      expect(generateTest(count)[i].zagat_rating <= 4 && generateTest(count)[i].zagat_rating > 0);
      expect(typeof generateTest(count)[i].photos === 'object');
      expect(typeof generateTest(count)[i].neighborhood === 'string');
      expect(generateTest(count)[i].price_level <= 4 && generateTest(count)[i].price_level > 0);
      expect(typeof generateTest(count)[i].types === 'string');
      expect(typeof generateTest(count)[i].nearby === 'object');
    }
  });
});
