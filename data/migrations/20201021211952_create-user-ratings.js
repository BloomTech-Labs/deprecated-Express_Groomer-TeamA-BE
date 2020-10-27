exports.up = async (knex) => {
    await knex.schema
      .createTable('user_ratings', function (table) {
        table.increments("id")
        table.string('profile_id')
          // forces integer to be positive
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('profiles')
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
        table.string('review_point').notNullable()
        table.string('feedback').default(null)
        table.timestamps(true, true)
      });
  };
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('user_ratings')
    await knex.schema.dropTableIfExists('profiles')
  };