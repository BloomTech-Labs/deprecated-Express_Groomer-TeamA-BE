exports.up = async (knex) => {
  await knex.schema.createTable('location_services', function (table) {
    table.increments('id');
    table
      .integer('service_id')
      // forces integer to be positive
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('services')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .integer('location_id')
      // forces integer to be positive
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('locations')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .integer('animal_id')
      // forces integer to be positive
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('animals')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.float('service_cost').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('location_services');
};
