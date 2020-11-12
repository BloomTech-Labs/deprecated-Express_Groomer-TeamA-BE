exports.up = async (knex) => {
    await knex.schema.createTable('favorite_groomers', function (table) {
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
        .string('groomer_id')
        // forces integer to be positive
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('profiles')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.primary(['customer_id', 'groomer_id']);
      table.timestamps(true, true);
    });
  };
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('favorite_groomers');
  };
  
