exports.up = async (knex) => {
    await knex.schema.table('profiles', function (table) {
        table.enu('user_type', ['Customer', 'Groomer']).notNullable();
        table.float('rating');
    });
};

exports.down = async (knex) => {
    await knex.schema.table('profiles', function (table) {
        table.dropColumn('user_type');
        table.dropColumn('rating');
    });
};
