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
          appointment_date_time: 1611878560,
          duration: 60,
        },
        {
          customer_id: '00ulthapbErVUwVJy4x6',
          groomer_id: '00ultwew80Onb2vOT4x6',
          pet_id: 1,
          location_service_id: 1,
          service_provider_name: 'Pro Grooming Services',
          status: 'Completed',
          appointment_date_time: 1611878560,
          duration: 60,
        },
      ]);
    });
};
