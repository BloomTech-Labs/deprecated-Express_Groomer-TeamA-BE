exports.up = async (knex) => {
  await knex.schema.createTable('groomer_cover_images', (table) => {
    table.increments('id');
    table
      .integer('business_profile_id')
      .notNullable()
      .references('id')
      .inTable('business_profiles')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.string('image').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('groomer_cover_images');
};
