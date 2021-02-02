exports.seed = async (knex) => {
  // resets ids
  await knex.raw('TRUNCATE TABLE profiles RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE animal_services RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE services RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE animals RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE location_services RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE locations RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE customer_pets RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE appointments RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE user_ratings RESTART IDENTITY CASCADE');
};
