exports.seed = async (knex) => {
  // Insert animals entries
  await knex('animals').insert([
    { animal_type: 'Cat' },
    { animal_type: 'Dog' },
  ]);
};
