exports.up = async (knex) => {
  await knex.schema.table('locations', function (table) {
    table.float('latitude').notNullable();
    table.float('longitude').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.table('locations', function (table) {
    table.dropColumn('latitude');
    table.dropColumn('longitude');
  });
};
