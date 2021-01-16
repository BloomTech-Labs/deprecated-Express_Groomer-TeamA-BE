exports.up = async (knex) => {
  await knex.schema.createTable('locations', function (table) {
    table.increments('id');
    table
      .string('profile_id')
      // forces integer to be positive
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('profiles')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.boolean('is_mobile').notNullable().default(0);
    table.string('address').notNullable();
    table.string('country').notNullable();
    table.string('state').notNullable();
    table.string('city').notNullable();
    table.integer('zip').notNullable();
    table.string('phone_number').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('locations');
};
