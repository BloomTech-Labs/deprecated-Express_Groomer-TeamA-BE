exports.seed = async (knex) => {
  // resets ids
  await knex.raw('TRUNCATE TABLE profiles RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE animal_services RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE services RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE animals RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE cities RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE states RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE countries RESTART IDENTITY CASCADE');
};
