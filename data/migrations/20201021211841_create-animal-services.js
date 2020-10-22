exports.up = async (knex) => {
    await knex.schema
      .createTable('animal_services', function (table) {
        table.integer('animal_id')
        // forces integer to be positive
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('animals')
        .onDelete("CASCADE")
		.onUpdate('CASCADE')
        table.integer('service_id')
        // forces integer to be positive
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('services')
        .onDelete("CASCADE")
		.onUpdate('CASCADE')
        // the combination of the two keys becomes our primary key
        // will enforce unique combinations of ids
        table.primary(['animal_id', 'service_id'])
        table.timestamps(true, true)
      });
  };
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('animal_services')
    await knex.schema.dropTableIfExists('services')
    await knex.schema.dropTableIfExists('animals')
  };