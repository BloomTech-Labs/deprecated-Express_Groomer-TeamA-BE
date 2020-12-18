exports.up = async (knex) => {
  await knex.schema.table('customer_pets', function (table) {
    table.string('health_issue').default(null);
  });
};

exports.down = async (knex) => {
  await knex.schema.table('customer_pets', function (table) {
    table.dropColumn('health_issue');
  });
};
