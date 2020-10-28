exports.up = async (knex) => {
  await knex.schema.createTable('business_hours', function (table) {
    table.increments('id');
    table
      .integer('location_id')
      // forces integer to be positive
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('locations')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.string('day_of_week').notNullable();
    table.string('hours_duration').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('business_hours');
};
