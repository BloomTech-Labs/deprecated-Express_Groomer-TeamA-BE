exports.up = async (knex) => {
  await knex.schema.createTable('cities', function (table) {
    table.increments('id');
    table.string('name');
    table
      .integer('state_id')
      // forces integer to be positive
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('states')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('cities');
  await knex.schema.dropTableIfExists('states');
};
