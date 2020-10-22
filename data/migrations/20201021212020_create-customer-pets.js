exports.up = async (knex) => {
    await knex.schema
      .createTable('customer_pets', function (table) {
        table.increments("id")
        table.string('customer_id')
        // forces integer to be positive
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('profiles')
        .onDelete("CASCADE")
		.onUpdate('CASCADE')
        table.integer('animal_id')
        // forces integer to be positive
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('animals')
        .onDelete("CASCADE")
		.onUpdate('CASCADE')
        table.string('color').default(null)
        table.string('date_of_birth').default(null)
        table.string('image_url').default(null)
        table.timestamps(true, true)
      });
  };
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('customer_pets')
    await knex.schema.dropTableIfExists('animals')
    await knex.schema.dropTableIfExists('profiles')
  };