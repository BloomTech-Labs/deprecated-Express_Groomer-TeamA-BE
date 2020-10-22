exports.up = async (knex) => {
    await knex.schema
      .createTable('states', function (table) {
        table.increments("id")
        table.string('name')
        table.integer('country_id')
        // forces integer to be positive
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('countries')
        .onDelete("CASCADE")
		.onUpdate('CASCADE')
      });
  };
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('states')
    await knex.schema.dropTableIfExists('countries')
  };