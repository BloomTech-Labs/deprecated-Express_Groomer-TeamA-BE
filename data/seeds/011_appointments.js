exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('appointments')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('appointments').insert([
        {
          id: 0,
          customer_id: '00ulthapbErVUwVJy4x6',
          groomer_id: '00ultwew80Onb2vOT4x6',
          pet_id: 0,
          location_service_id: 0,
          service_provider_name: 'Buddy',
          status: 'Pending',
          appointment_date: '2020-10-19T06:00:00.000Z',
          appointment_time: '07:37:16',
        },
      ]);
    });
};
