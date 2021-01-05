const db = require('../../data/db-config');

const create = (appointment) => {
  return db('appointments').insert(appointment).returning('*');
};

const getAll = async (profileID) => {
  // check if profile is groomer or customer
  const [type] = await db('profiles')
    .where({ id: profileID })
    .select('user_type');

  console.log(('type', type));

  switch (type.user_type) {
    case 'Groomer':
      return db('appointments').where({ groomer_id: profileID }).returning('*');
    case 'Customer':
      return db('appointments')
        .where({ customer_id: profileID })
        .returning('*');
    default:
      console.error({ message: 'type is not Customer or Groomer' });
      throw new Error({ message: 'type is not Customer or Groomer' });
  }
};

const get = async (appointmentId) => {
  return db('appointments').where({ id: appointmentId }).returning('*');
};

const remove = async (appointmentId) => {
  const deletedApp = await db('appointments')
    .select('*')
    .where({ id: appointmentId });
  const changes = await db('appointments')
    .delete()
    .where({ id: appointmentId });
  return changes ? deletedApp : null;
};

module.exports = {
  create,
  getAll,
  get,
  remove,
};
