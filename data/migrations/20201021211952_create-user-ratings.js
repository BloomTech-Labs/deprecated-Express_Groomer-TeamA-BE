exports.up = async (knex) => {
  await knex.schema.createTable('user_ratings', function (table) {
    table.increments('id');
    table
      .string('groomer_id')
      // forces integer to be positive
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('profiles')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .string('customer_id')
      // forces integer to be positive
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('profiles')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .integer('location_service_id')
      // forces integer to be positive
      .unsigned()
      .default(null)
      .references('id')
      .inTable('location_services')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.string('review_point').notNullable();
    table.string('feedback').default(null);
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('user_ratings');
};
