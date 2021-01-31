const faker = require('faker');

// all customer pets should have had a least one previous appointment
// half customer pets have one pending
// half customer pets have one Approved

const unixTime = Math.floor(Date.now() / 1000);

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('appointments')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('appointments').insert([
        {
          customer_id: '00ulthapbErVUwVJy4x6',
          groomer_id: '00ultwew80Onb2vOT4x6',
          pet_id: 1,
          location_service_id: 1,
          service_provider_name: 'Pro Grooming Services',
          status: 'Pending',
          appointment_date_time: Math.floor(
            new Date(faker.date.soon()).getTime() / 1000
          ),
          duration: 60,
        },
        {
          customer_id: '00ulthapbErVUwVJy4x6',
          groomer_id: '00ultwew80Onb2vOT4x6',
          pet_id: 1,
          location_service_id: 1,
          service_provider_name: 'Pro Grooming Services',
          status: 'Completed',
          appointment_date_time: Math.floor(
            new Date(faker.date.recent()).getTime() / 1000
          ),
          duration: 60,
        },
        {
          customer_id: '00ulthapbErVUwVJy4x6',
          groomer_id: '00ultwew80Onb2vOT4x6',
          pet_id: 2,
          location_service_id: 1,
          service_provider_name: 'Pro Grooming Services',
          status: 'Approved',
          appointment_date_time: Math.floor(
            new Date(faker.date.soon()).getTime() / 1000
          ),
          duration: 60,
        },
        {
          customer_id: '00ulthapbErVUwVJy4x6',
          groomer_id: '00ultwew80Onb2vOT4x6',
          pet_id: 2,
          location_service_id: 1,
          service_provider_name: 'Pro Grooming Services',
          status: 'Completed',
          appointment_date_time: Math.floor(
            new Date(faker.date.recent()).getTime() / 1000
          ),
          duration: 60,
        },
        {
          customer_id: '00ulthapbErVUwVJy4x6',
          groomer_id: '00ultwew80Onb2vOT4x6',
          pet_id: 3,
          location_service_id: 1,
          service_provider_name: 'Pro Grooming Services',
          status: 'Completed',
          appointment_date_time: Math.floor(
            new Date(faker.date.recent()).getTime() / 1000
          ),
          duration: 60,
        },
        {
          customer_id: '00ulthapbErVUwVJy4x6',
          groomer_id: '00ultwew80Onb2vOT4x6',
          pet_id: 4,
          location_service_id: 1,
          service_provider_name: 'Pro Grooming Services',
          status: 'Completed',
          appointment_date_time: Math.floor(
            new Date(faker.date.recent()).getTime() / 1000
          ),
          duration: 60,
        },
        {
          customer_id: '00ultx74kMUmEW8054x6',
          groomer_id: '00ultwew80Onb2vOT4x6',
          pet_id: 5,
          location_service_id: 1,
          service_provider_name: 'Pro Grooming Services',
          status: 'Completed',
          appointment_date_time: Math.floor(
            new Date(faker.date.recent()).getTime() / 1000
          ),
          duration: 60,
        },
        {
          customer_id: '00ultwz1n9ORpNFc04x6',
          groomer_id: '00ultwew80Onb2vOT4x6',
          pet_id: 6,
          location_service_id: 1,
          service_provider_name: 'Pro Grooming Services',
          status: 'Completed',
          appointment_date_time: Math.floor(
            new Date(faker.date.recent()).getTime() / 1000
          ),
          duration: 60,
        },
        {
          customer_id: '00u13ol5x1kmKxVJU4x7',
          groomer_id: '00ultwew80Onb2vOT4x6',
          pet_id: 7,
          location_service_id: 1,
          service_provider_name: 'Pro Grooming Services',
          status: 'Completed',
          appointment_date_time: Math.floor(
            new Date(faker.date.recent()).getTime() / 1000
          ),
          duration: 60,
        },
        {
          customer_id: '00ultx74kMUmEW8054x6',
          groomer_id: '00ultwew80Onb2vOT4x6',
          pet_id: 5,
          location_service_id: 1,
          service_provider_name: 'Pro Grooming Services',
          status: 'Approved',
          appointment_date_time: Math.floor(
            new Date(faker.date.soon()).getTime() / 1000
          ),
          duration: 60,
        },
        {
          customer_id: '00ultwz1n9ORpNFc04x6',
          groomer_id: '00ultwew80Onb2vOT4x6',
          pet_id: 6,
          location_service_id: 1,
          service_provider_name: 'Pro Grooming Services',
          status: 'Pending',
          appointment_date_time: Math.floor(
            new Date(faker.date.soon()).getTime() / 1000
          ),
          duration: 60,
        },
        {
          customer_id: '00u13ol5x1kmKxVJU4x7',
          groomer_id: '00ultwew80Onb2vOT4x6',
          pet_id: 7,
          location_service_id: 1,
          service_provider_name: 'Pro Grooming Services',
          status: 'Approved',
          appointment_date_time: Math.floor(
            new Date(faker.date.soon()).getTime() / 1000
          ),
          duration: 60,
        },
      ]);
    });
};
