exports.up = async (knex) => {
    await knex.schema
      .createTable('locations', function (table) {
        table.increments("id")
        table.string('profile_id')
          // forces integer to be positive
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('profiles')
          .onDelete("CASCADE")
          .onUpdate('CASCADE')
        table.boolean('is_mobo').notNullable().default(0)
        table.string('address').notNullable()
        table.integer('country_id')
          // forces integer to be positive
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('countries')
          .onDelete("CASCADE")
          .onUpdate('CASCADE')
        table.integer('state_id')
          // forces integer to be positive
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('states')
          .onDelete("CASCADE")
          .onUpdate('CASCADE')
        table.integer('city_id')
          // forces integer to be positive
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('cities')
          .onDelete("CASCADE")
          .onUpdate('CASCADE')
        table.integer('zip').notNullable()
        table.string('phone_number').notNullable()
        table.timestamps(true, true)
      });
  };
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('locations')
    await knex.schema.dropTableIfExists('profiles')
    await knex.schema.dropTableIfExists('cities')
    await knex.schema.dropTableIfExists('states')
    await knex.schema.dropTableIfExists('countries')
  };