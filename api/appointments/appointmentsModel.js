const db = require('../../data/db-config');

const create = (appointment) => {
  return db('appointments').insert(appointment).returning('*');
};

const getAll = async (profileID) => {
  // check if profile is groomer or customer
  const [type] = await db('profiles')
    .where({ id: profileID })
    .select('user_type');

  switch (type.user_type) {
    case 'Groomer':
      return db('appointments')
        .where({ 'appointments.groomer_id': profileID })
        .join('customer_pets as cp', 'cp.id', 'appointments.pet_id')
        .join('animals as a', 'a.id', 'cp.animal_id')
        .join(
          'location_services as ls',
          'ls.id',
          'appointments.location_service_id'
        )
        .join('services as s', 's.id', 'ls.service_id')
        .join('locations as l', 'l.id', 'ls.location_id')
        .returning('*');
    case 'Customer':
      return db('appointments')
        .where({ 'appointments.customer_id': profileID })
        .join('customer_pets as cp', 'cp.id', 'appointments.pet_id')
        .join('animals as a', 'a.id', 'cp.animal_id')
        .join(
          'location_services as ls',
          'ls.id',
          'appointments.location_service_id'
        )
        .join('services as s', 's.id', 'ls.service_id')
        .join('locations as l', 'l.id', 'ls.location_id')
        .returning('*');
    default:
      console.error({ message: 'type is not Customer or Groomer' });
      throw new Error({ message: 'type is not Customer or Groomer' });
  }
};
const getById = (id) =>
  db('appointments')
    .where({ 'appointments.id': id })
    .join('customer_pets as cp', 'cp.id', 'appointments.pet_id')
    .join('animals as a', 'a.id', 'cp.animal_id')
    .join(
      'location_services as ls',
      'ls.id',
      'appointments.location_service_id'
    )
    .join('services as s', 's.id', 'ls.service_id')
    .join('locations as l', 'l.id', 'ls.location_id')
    .first()
    .select('*');

const getAllBy = (filter) =>
  db('appointments')
    .where(filter)
    .join('customer_pets as cp', 'cp.id', 'appointments.pet_id')
    .join('animals as a', 'a.id', 'cp.animal_id')
    .join(
      'location_services as ls',
      'ls.id',
      'appointments.location_service_id'
    )
    .join('services as s', 's.id', 'ls.service_id')
    .join('locations as l', 'l.id', 'ls.location_id')
    .select('*');

const remove = async (appointmentId) => {
  const deletedApp = await db('appointments')
    .select('*')
    .where({ id: appointmentId });
  const changes = await db('appointments')
    .delete()
    .where({ id: appointmentId });
  return changes ? deletedApp : null;
};

const update = async (appointmentId, appointmentChanges) => {
  appointmentChanges = {
    ...appointmentChanges,
    id: appointmentChanges.appointment_id,
  };
  delete appointmentChanges.appointment_id;
  await db('appointments')
    .update(appointmentChanges)
    .where({ id: appointmentId });

  return db('appointments').select('*').where({ id: appointmentId });
};

module.exports = {
  create,
  getAll,
  getById,
  getAllBy,
  remove,
  update,
};
