const faker = require('faker');

// Number of Locations = 14
// Number of Services = 10
// Number of Animals = 2
// Total number of Animal Services = 20
// Each Location will have 20 services which means 14 * 20 = 280 entries

const locationIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

const animalIds = [1, 2];

const services = [
  { id: 1, description: 'Bath and Brushing' },
  { id: 2, description: 'Bath, Haircut and brushing' },
  { id: 3, description: 'Quick Trim with relaxing music' },
  { id: 4, description: 'Intensive pawdicure' },
  { id: 5, description: 'Professional Ear Cleaning' },
  { id: 6, description: 'Dental check up and cleaning' },
  { id: 7, description: 'Blow out for your best friend' },
  { id: 8, description: 'Relaxing shampoo' },
  { id: 9, description: 'Someone has to do it' },
  {
    id: 10,
    description:
      'It can happen to anyone, we take care of it no questions asked',
  },
];

let animalServices = [];

animalIds.forEach((animal) => {
  services.forEach((service) => {
    animalServices = [
      ...animalServices,
      {
        service_id: service.id,
        service_description: service.description,
        service_cost: faker.commerce.price(25, 250, 2),
        service_image: 'https://placeimg.com/640/480/animals',
        animal_id: animal,
      },
    ];
  });
});

let locationServices = [];

animalServices.forEach((animalService) => {
  locationIds.forEach((location) => {
    locationServices = [
      ...locationServices,
      { ...animalService, location_id: location },
    ];
  });
});

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('location_services')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('location_services').insert(locationServices);
    });
};
