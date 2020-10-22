exports.up = async (knex) => {
    await knex.schema
      .createTable('services', function (table) {
        table.increments("id")
        table.string('name').notNullable().unique()
        table.timestamps(true, true)
      });
  };
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('services')
  };
  