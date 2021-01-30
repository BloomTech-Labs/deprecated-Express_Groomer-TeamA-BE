exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('location_services')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('location_services').insert([
        {
          id: 0,
          location_id: 1,
          animal_id: 2,
          service_id: 2,
          service_cost: 100,
          service_description: 'a service for animals',
        },
      ]);
    });
};
