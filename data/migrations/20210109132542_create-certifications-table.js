exports.up = async (knex) => {
  await knex.schema.createTable('certifications', (table) => {
    table.increments('id');
    table
      .string('groomer_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('profiles')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.string('title').notNullable();
    table.string('institute').notNullable();
    table.string('image').notNullable();
    table.integer('date_issued').notNullable();
    table.integer('date_expired').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('certifications');
};
