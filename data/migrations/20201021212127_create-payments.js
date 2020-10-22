exports.up = async (knex) => {
    await knex.schema
      .createTable('payments', function (table) {
        table.increments("id")
        table.integer('appointment_id')
        // forces integer to be positive
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('appointments')
        .onDelete("CASCADE")
		.onUpdate('CASCADE')
        table.string('payment_type').notNullable()
        table.enu('status', ['Pending', 'Paid', 'Not Paid']).notNullable()
        table.float('amount').notNullable()
        table.timestamps(true, true)
      });
  };
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('payments')
    await knex.schema.dropTableIfExists('appointments')
  };