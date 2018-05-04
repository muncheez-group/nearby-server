const faker = require('faker');
const count = 5;
let generateTest = (total) => {
	let result = [];
	for (let i = 0; i < total; i++) {
		const data = {
			name: faker.address.city() + faker.address.streetName(),
			place_id: i,
			google_rating: ((Math.random() * 4) + 1).toFixed(1),
			zagat_rating: ((Math.random() * 4) + 1).toFixed(1),
			photos: Array.from({length: 4}, ()=> Math.floor(Math.random() * 100)),
			neighborhood: faker.address.streetName() + faker.address.citySuffix(),
			price_level: Math.floor(((Math.random() * 4) + 1)),
			types: faker.lorem.word(),
			nearby: Array.from({length: 6}, ()=> Math.floor(Math.random() * count)),
		};
		result.push(data)
	}
	return result;
};

describe ('data generator', () => {
	it ('has correct properties', () => {
		for (let i = 0; i < count; i++) {
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
	it ('has valid property types', () => {
		for (let i = 0; i < count; i++) {
			expect(typeof generateTest(count)[i].name === String);
			expect(generateTest(count)[i].place_id === Number);
			expect(generateTest(count)[i].google_rating <= 4 && generateTest(count)[i].google_rating > 0);
			expect(generateTest(count)[i].zagat_rating <= 4 && generateTest(count)[i].zagat_rating > 0);
			expect(typeof generateTest(count)[i].photos === Object);
			expect(typeof generateTest(count)[i].neighborhood === String);
			expect(generateTest(count)[i].price_level <= 4 && generateTest(count)[i].price_level > 0);
			expect(typeof generateTest(count)[i].types === String);
			expect(typeof generateTest(count)[i].nearby === Object);
		}
	})
});
