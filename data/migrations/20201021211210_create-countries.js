exports.up = async (knex) => {
  await knex.schema.createTable('countries', function (table) {
    table.increments('id');
    table.string('sort_name', 3);
    table.string('name');
    table.string('phone_code');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('countries');
};
