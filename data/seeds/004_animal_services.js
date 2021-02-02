exports.seed = async (knex) => {
  await knex('animal_services').insert([
    // Insert animal services
    { service_id: 1, animal_id: 1 },
    { service_id: 2, animal_id: 1 },
    { service_id: 3, animal_id: 1 },
    { service_id: 4, animal_id: 1 },
    { service_id: 5, animal_id: 1 },
    { service_id: 6, animal_id: 1 },
    { service_id: 7, animal_id: 1 },
    { service_id: 8, animal_id: 1 },
    { service_id: 9, animal_id: 1 },
    { service_id: 10, animal_id: 1 },
    { service_id: 1, animal_id: 2 },
    { service_id: 2, animal_id: 2 },
    { service_id: 3, animal_id: 2 },
    { service_id: 4, animal_id: 2 },
    { service_id: 5, animal_id: 2 },
    { service_id: 6, animal_id: 2 },
    { service_id: 7, animal_id: 2 },
    { service_id: 8, animal_id: 2 },
    { service_id: 9, animal_id: 2 },
    { service_id: 10, animal_id: 2 },
  ]);
};
