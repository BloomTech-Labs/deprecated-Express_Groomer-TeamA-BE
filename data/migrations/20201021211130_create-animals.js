exports.up = async (knex) => {
  await knex.schema.createTable('animals', function (table) {
    table.increments('id');
    table.string('animal_type').notNullable().unique();
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('animals');
};
