exports.seed = async (knex) => {
  await knex('animal_services').insert([
    // Insert animal services
    { service_id: 1, animal_id: 1 },
    { service_id: 2, animal_id: 1 },
    { service_id: 3, animal_id: 1 },
    { service_id: 1, animal_id: 2 },
    { service_id: 2, animal_id: 2 },
    { service_id: 3, animal_id: 2 },
  ]);
};
