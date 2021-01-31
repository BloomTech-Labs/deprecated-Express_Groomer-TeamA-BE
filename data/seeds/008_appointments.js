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
<<<<<<< HEAD:data/seeds/008_appointments.js
          pet_id: 1,
          location_service_id: 1,
          service_provider_name: 'Pro Grooming Services',
=======
          pet_id: 0,
          location_service_id: 0,
          service_provider_name: 'Buddy',
>>>>>>> ef06d9f388981ec4a1b8b6dcbe04df62b05bfee8:data/seeds/011_appointments.js
          status: 'Completed',
          appointment_date_time: 1611878560,
          duration: 60,
        },
      ]);
    });
};
