const db = require('../../data/db-config');

const create = async (appointment) => {
  const [created] = await db('appointments').insert(appointment).returning('*');

  return getById(created.id);
};

const getAll = async (profileID) => {
  // check if profile is groomer or customer
  const [type] = await db('profiles')
    .where({ id: profileID })
    .select('user_type');

  switch (type.user_type) {
    case 'Groomer':
      return db('appointments as app')
        .where({ 'app.groomer_id': profileID })
        .join('customer_pets as cp', 'cp.id', 'app.pet_id')
        .join('animals as a', 'a.id', 'cp.animal_id')
        .join('location_services as ls', 'ls.id', 'app.location_service_id')
        .join('services as s', 's.id', 'ls.service_id')
        .join('locations as l', 'l.id', 'ls.location_id')
        .select(
          'app.id as appointment_id',
          'app.groomer_id',
          'app.customer_id',
          'app.appointment_date_time',
          'app.status',
          'app.duration',
          'app.service_provider_name',
          'cp.pet_name',
          'a.animal_type as type',
          'cp.color',
          'cp.date_of_birth',
          'cp.image_url',
          'cp.health_issue',
          's.name as service_name',
          'ls.service_description',
          'ls.service_image',
          'ls.service_cost',
          'l.address',
          'l.state',
          'l.city',
          'l.country',
          'l.zip',
          'l.phone_number',
          'l.longitude',
          'l.latitude'
        );
    case 'Customer':
      return db('appointments as app')
        .join('customer_pets as cp', 'cp.id', 'app.pet_id')
        .join('animals as a', 'a.id', 'cp.animal_id')
        .join('location_services as ls', 'ls.id', 'app.location_service_id')
        .join('services as s', 's.id', 'ls.service_id')
        .join('locations as l', 'l.id', 'ls.location_id')
        .where({ 'app.customer_id': profileID })
        .select(
          'app.id as appointment_id',
          'app.groomer_id',
          'app.customer_id',
          'app.appointment_date_time',
          'app.status',
          'app.duration',
          'app.service_provider_name',
          'cp.pet_name',
          'a.animal_type as type',
          'cp.color',
          'cp.date_of_birth',
          'cp.image_url',
          'cp.health_issue',
          's.name as service_name',
          'ls.service_description',
          'ls.service_image',
          'ls.service_cost',
          'l.address',
          'l.state',
          'l.city',
          'l.country',
          'l.zip',
          'l.phone_number',
          'l.longitude',
          'l.latitude'
        );
    default:
      console.error({ message: 'type is not Customer or Groomer' });
      throw new Error({ message: 'type is not Customer or Groomer' });
  }
};
const getById = (id) =>
  db('appointments as app')
    .where({ 'app.id': id })
    .join('customer_pets as cp', 'cp.id', 'app.pet_id')
    .join('animals as a', 'a.id', 'cp.animal_id')
    .join('location_services as ls', 'ls.id', 'app.location_service_id')
    .join('services as s', 's.id', 'ls.service_id')
    .join('locations as l', 'l.id', 'ls.location_id')
    .first()
    .select(
      'app.id as appointment_id',
      'app.groomer_id',
      'app.customer_id',
      'app.appointment_date_time',
      'app.status',
      'app.duration',
      'app.service_provider_name',
      'cp.pet_name',
      'a.animal_type as type',
      'cp.color',
      'cp.date_of_birth',
      'cp.image_url',
      'cp.health_issue',
      's.name as service_name',
      'ls.service_description',
      'ls.service_image',
      'ls.service_cost',
      'l.address',
      'l.state',
      'l.city',
      'l.country',
      'l.zip',
      'l.phone_number',
      'l.longitude',
      'l.latitude'
    );

const getAllBy = (filter) =>
  db('appointments as app')
    .where(filter)
    .join('customer_pets as cp', 'cp.id', 'app.pet_id')
    .join('animals as a', 'a.id', 'cp.animal_id')
    .join('location_services as ls', 'ls.id', 'app.location_service_id')
    .join('services as s', 's.id', 'ls.service_id')
    .join('locations as l', 'l.id', 'ls.location_id')
    .select(
      'app.id as appointment_id',
      'app.groomer_id',
      'app.customer_id',
      'app.appointment_date_time',
      'app.status',
      'app.duration',
      'app.service_provider_name',
      'cp.pet_name',
      'a.animal_type as type',
      'cp.color',
      'cp.date_of_birth',
      'cp.image_url',
      'cp.health_issue',
      's.name as service_name',
      'ls.service_description',
      'ls.service_image',
      'ls.service_cost',
      'l.address',
      'l.state',
      'l.city',
      'l.country',
      'l.zip',
      'l.phone_number',
      'l.longitude',
      'l.latitude'
    );

const remove = async (appointmentId) => {
  // const deletedApp = await db('appointments')
  //   .select('*')
  //   .where({ id: appointmentId });
  const deletedApp = await getById(appointmentId);
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

  return getById(appointmentId);
};

const appointmentsObject = (appointments) => {
  let user_appointments = [];

  user_appointments = appointments.map((appointment) => {
    const id = appointment.appointment_id;

    const appointment_obj = {
      id,
      groomer_id: appointment.groomer_id,
      customer_id: appointment.customer_id,
      appointment_date_time: appointment.appointment_date_time,
      status: appointment.status,
      duration: appointment.duration,
      pet: {
        name: appointment.pet_name,
        type: appointment.type,
        color: appointment.color,
        date_of_birth: appointment.date_of_birth,
        image_url: appointment.image_url,
        health_issue: appointment.health_issue,
      },
      service: {
        name: appointment.name,
        service_description: appointment.service_description,
        service_image: appointment.service_image,
        service_cost: appointment.service_cost,
      },
      location: {
        location_name: appointment.service_provider_name,
        street_address: appointment.address,
        state: appointment.state,
        city: appointment.city,
        zip: appointment.zip,
        country: appointment.country,
        phone_number: appointment.phone_number,
        latitude: appointment.latitude,
        longitude: appointment.longitude,
      },
    };

    return appointment_obj;
  });
  console.log({ user_appointments });
  return user_appointments;
};

module.exports = {
  appointmentsObject,
  create,
  getAll,
  getById,
  getAllBy,
  remove,
  update,
};
