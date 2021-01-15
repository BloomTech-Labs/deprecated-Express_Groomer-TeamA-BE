exports.up = async (knex) => {
  await knex.schema.createTable('location_services_features', (table) => {
    table.increments('id');
    table
      .integer('service_id')
      .notNullable()
      .references('id')
      .inTable('location_services')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.string('feature').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('location_services_features');
};
