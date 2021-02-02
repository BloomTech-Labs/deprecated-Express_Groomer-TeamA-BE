const faker = require('faker');

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('customer_pets')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('customer_pets').insert([
        {
          customer_id: '00ulthapbErVUwVJy4x6',
          animal_id: 1,
          pet_name: faker.name.firstName() + ' ' + faker.name.lastName(),
          color: faker.commerce.color(),
          date_of_birth: faker.date.between('1-1-2015', Date(Date.now())),
          image_url: 'https://placeimg.com/640/480/animals/cats',
          health_issue: 'Overt Cuteness',
        },
        {
          customer_id: '00ulthapbErVUwVJy4x6',
          animal_id: 1,
          pet_name: faker.name.firstName() + ' ' + faker.name.lastName(),
          color: faker.commerce.color(),
          date_of_birth: faker.date.between('1-1-2015', Date(Date.now())),
          image_url: 'https://placeimg.com/640/480/animals/cats',
          health_issue: 'Overt Cuteness',
        },
        {
          customer_id: '00ulthapbErVUwVJy4x6',
          animal_id: 2,
          pet_name: faker.name.firstName() + ' ' + faker.name.lastName(),
          color: faker.commerce.color(),
          date_of_birth: faker.date.between('1-1-2015', Date(Date.now())),
          image_url: 'https://placeimg.com/640/480/animals/dogs',
          health_issue: 'Puppy Breath',
        },
        {
          customer_id: '00ulthapbErVUwVJy4x6',
          animal_id: 2,
          pet_name: faker.name.firstName() + ' ' + faker.name.lastName(),
          color: faker.commerce.color(),
          date_of_birth: faker.date.between('1-1-2015', Date(Date.now())),
          image_url: 'https://placeimg.com/640/480/animals/dogs',
          health_issue: 'Puppy Breath',
        },
        {
          customer_id: '00ultx74kMUmEW8054x6',
          animal_id: 2,
          pet_name: faker.name.firstName() + ' ' + faker.name.lastName(),
          color: faker.commerce.color(),
          date_of_birth: faker.date.between('1-1-2015', Date(Date.now())),
          image_url: 'https://placeimg.com/640/480/animals/dogs',
          health_issue: 'Puppy Breath',
        },
        {
          customer_id: '00ultwz1n9ORpNFc04x6',
          animal_id: 1,
          pet_name: faker.name.firstName() + ' ' + faker.name.lastName(),
          color: faker.commerce.color(),
          date_of_birth: faker.date.between('1-1-2015', Date(Date.now())),
          image_url: 'https://placeimg.com/640/480/animals/cats',
          health_issue: 'Overt Cuteness',
        },
        {
          customer_id: '00u13ol5x1kmKxVJU4x7',
          animal_id: 1,
          pet_name: faker.name.firstName() + ' ' + faker.name.lastName(),
          color: faker.commerce.color(),
          date_of_birth: faker.date.between('1-1-2015', Date(Date.now())),
          image_url: 'https://placeimg.com/640/480/animals/cats',
          health_issue: 'Overt Cuteness',
        },
      ]);
    });
};
