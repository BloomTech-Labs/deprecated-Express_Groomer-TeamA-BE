exports.up = async (knex) => {
  await knex.schema.createTable('customer_pet_vaccinations', function (table) {
    table.increments('id');
    table
      .integer('pet_id')
      // forces integer to be positive
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('customer_pets')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.string('visit_date').notNullable();
    table.string('vaccination_name').notNullable();
    table.date('given_by').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('customer_pet_vaccinations');
};
