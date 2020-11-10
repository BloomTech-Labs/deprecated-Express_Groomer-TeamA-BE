const db = require('../../data/db-config');

const findAll = async () => {
  return await db('animal_services as ans')
    .join('services as s', 's.id', 'ans.service_id')
    .join('animals as a', 'a.id', 'ans.animal_id')
    .select(
      'ans.animal_id',
      'a.animal_type',
      'ans.service_id',
      's.name as service_name'
    );
};

const findBy = (filter) => {
  return db('animal_services').where(filter);
};

const findById = async (id) => {
  return db('animal_services as ans')
    .join('services as s', 's.id', 'ans.service_id')
    .join('animals as a', 'a.id', 'ans.animal_id')
    .where('ans.animal_id', id)
    .select(
      'ans.animal_id',
      'a.animal_type',
      'ans.service_id',
      's.name as service_name'
    );
};

const create = async (animal_service) => {
  return db('animal_services').insert(animal_service).returning('*');
};

const update = (animal_id, service_id, animal_service) => {
  return db('animal_services')
    .where('animal_id', animal_id)
    .where('service_id', service_id)
    .first()
    .update(animal_service)
    .returning('*');
};

const remove = async (animal_id, service_id) => {
  return await db('animal_services')
    .where('animal_id', animal_id)
    .where('service_id', service_id)
    .del();
};

const animalServiceByIDs = async (animal_id, service_id) => {
  return db('animal_services as ans')
    .join('services as s', 's.id', 'ans.service_id')
    .join('animals as a', 'a.id', 'ans.animal_id')
    .select(
      'ans.animal_id',
      'a.animal_type',
      'ans.service_id',
      's.name as service_name'
    )
    .where('ans.animal_id', animal_id)
    .where('ans.service_id', service_id);
};

function animalServicesObject(animal_services) {
  const total_services = animal_services.length;

  const animals = {};

  for (let i = 0; i < total_services; i++) {
    const animal_id = animal_services[i]['animal_id'];
    const animal_type = animal_services[i]['animal_type'];
    const service_id = animal_services[i]['service_id'];
    const service_name = animal_services[i]['service_name'];

    const animalObj = {
      id: animal_id,
      animal_type: animal_type,
      services: [],
    };

    if (!animals[animal_id]) {
      animals[animal_id] = animalObj;
    }

    service_obj = { id: service_id, name: service_name };

    animals[animal_id]['services'].push(service_obj);
  }

  result = [];

  Object.keys(animals).forEach((key) => {
    result.push(animals[key]);
  });

  return result;
}

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
  animalServicesObject,
  animalServiceByIDs,
};
