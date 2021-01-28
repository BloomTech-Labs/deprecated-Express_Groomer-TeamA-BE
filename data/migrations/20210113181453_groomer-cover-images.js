exports.up = async (knex) => {
  await knex.schema.createTable('groomer_cover_images', (table) => {
    table.increments('id');
    table
      .string('groomer_id')
      .notNullable()
      .references('id')
      .inTable('profiles')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.string('image').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('groomer_cover_images');
};
