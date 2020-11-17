const db = require('../../data/db-config');

const findById = async (id) => {
  return await db('location_services as ls')
    .join('locations as l', 'l.id', 'ls.location_id')
    .join('services as s', 's.id', 'ls.service_id')
    .join('animals as a', 'a.id', 'ls.animal_id')
    .join('states as stat', 'stat.id', 'l.state_id')
    .join('cities as c', 'c.id', 'l.city_id')
    .select(
      'ls.id as location_service_id',
      'ls.location_id',
      'l.address',
      'l.state_id',
      'l.city_id',
      'l.latitude',
      'l.longitude',
      'stat.name as state_name',
      'c.name as city_name',
      'ls.service_id',
      's.name as service_name',
      'ls.animal_id',
      'a.animal_type as animal_type',
      'ls.service_cost'
    )
    .where('ls.id', id)
    .first();
};

const findAll = async (profile_id) => {
  return await db('location_services as ls')
    .join('locations as l', 'l.id', 'ls.location_id')
    .join('profiles as p', 'p.id', 'l.profile_id')
    .join('services as s', 's.id', 'ls.service_id')
    .join('animals as a', 'a.id', 'ls.animal_id')
    .join('states as stat', 'stat.id', 'l.state_id')
    .join('cities as c', 'c.id', 'l.city_id')
    .select(
      'ls.id as location_service_id',
      'ls.location_id',
      'l.address',
      'l.state_id',
      'l.city_id',
      'l.latitude',
      'l.longitude',
      'stat.name as state_name',
      'c.name as city_name',
      'ls.service_id',
      's.name as service_name',
      'ls.animal_id',
      'a.animal_type as animal_type',
      'ls.service_cost'
    )
    .where('l.profile_id', profile_id);
};

const locationServiceByIDs = async (location_id, animal_id, service_id) => {
  return await db('location_services as ls')
    .join('locations as l', 'l.id', 'ls.location_id')
    .join('services as s', 's.id', 'ls.service_id')
    .join('animals as a', 'a.id', 'ls.animal_id')
    .join('states as stat', 'stat.id', 'l.state_id')
    .join('cities as c', 'c.id', 'l.city_id')
    .select(
      'ls.id as location_service_id',
      'ls.location_id',
      'l.address',
      'l.state_id',
      'l.city_id',
      'l.latitude',
      'l.longitude',
      'stat.name as state_name',
      'c.name as city_name',
      'ls.service_id',
      's.name as service_name',
      'ls.animal_id',
      'a.animal_type as animal_type',
      'ls.service_cost'
    )
    .where('ls.animal_id', animal_id)
    .where('ls.service_id', service_id)
    .where('ls.location_id', location_id)
    .first();
};

const isLocationServiceUnique = async (
  location_id,
  animal_id,
  service_id,
  location_service_id
) => {
  let qry = db('location_services')
    .where('location_id', location_id)
    .where('animal_id', animal_id)
    .where('service_id', service_id)
    .first();
  if (location_service_id)
    // update
    qry.whereNot('id', location_service_id);

  return await qry;
};

const create = async (location) => {
  return await db('location_services').insert(location).returning('*');
};

const update = async (location_service_id, location_service) => {
  return await db('location_services')
    .where('id', location_service_id)
    .first()
    .update(location_service)
    .returning('*');
};

// Get Location Service By Location ID
const findByLocationId = async (location_id, profile_id) => {
  return await db('location_services as ls')
    .join('locations as l', 'l.id', 'ls.location_id')
    .join('profiles as p', 'p.id', 'l.profile_id')
    .join('services as s', 's.id', 'ls.service_id')
    .join('animals as a', 'a.id', 'ls.animal_id')
    .join('states as stat', 'stat.id', 'l.state_id')
    .join('cities as c', 'c.id', 'l.city_id')
    .where('ls.location_id', location_id)
    .where('l.profile_id', profile_id)
    .select(
      'ls.id as location_service_id',
      'ls.location_id',
      'l.address',
      'l.state_id',
      'l.city_id',
      'l.latitude',
      'l.longitude',
      'stat.name as state_name',
      'c.name as city_name',
      'ls.service_id',
      's.name as service_name',
      'ls.animal_id',
      'a.animal_type as animal_type',
      'ls.service_cost'
    );
};

const remove = async (id) => {
  return await db('location_services').where({ id }).del();
};

// Get Location Service By Location ID
const isUserLocation = async (location_id, profile_id) => {
  return await db('locations as l')
    .join('profiles as p', 'p.id', 'l.profile_id')
    .where('l.id', location_id)
    .where('l.profile_id', profile_id)
    .first();
};

function locationServiceObject(location_services) {
  let result = {};
  const animals = {};
  const total_services = location_services.length;

  for (let i = 0; i < total_services; i++) {
    const location_service_id = location_services[i]['location_service_id'];
    const location_id = location_services[i]['location_id'];
    const latitude = location_services[i]['latitude'];
    const longitude = location_services[i]['longitude'];
    const city_id = location_services[i]['city_id'];
    const city_name = location_services[i]['city_name'];
    const state_id = location_services[i]['state_id'];
    const state_name = location_services[i]['state_name'];
    const animal_id = location_services[i]['animal_id'];
    const animal_type = location_services[i]['animal_type'];
    const service_id = location_services[i]['service_id'];
    const service_name = location_services[i]['service_name'];
    const service_cost = location_services[i]['service_cost'];

    //result["location_id"]
    if (i == 0)
      result = {
        location_id: location_id,
        city_id: city_id,
        city_name: city_name,
        state_id: state_id,
        state_name: state_name,
        latitude: latitude,
        longitude: longitude,
      };

    const animalObj = {
      animal_id: animal_id,
      animal_type: animal_type,
      services: [],
    };

    if (!animals[animal_id]) {
      animals[animal_id] = animalObj;
    }

    const service_obj = {
      location_service_id: location_service_id,
      service_id: service_id,
      service_name: service_name,
      service_cost: service_cost,
    };

    animals[animal_id]['services'].push(service_obj);
  }

  result['animals'] = [];

  Object.keys(animals).forEach((key) => {
    result['animals'].push(animals[key]);
  });

  return result;
}

function allLocationServicesObject(location_services) {
  const total_locations = location_services.length;

  const location = {};
  const result = {};

  for (let i = 0; i < total_locations; i++) {
    const location_service_id = location_services[i]['location_service_id'];
    const location_id = location_services[i]['location_id'];
    const latitude = location_services[i]['latitude'];
    const longitude = location_services[i]['longitude'];
    const city_id = location_services[i]['city_id'];
    const city_name = location_services[i]['city_name'];
    const state_id = location_services[i]['state_id'];
    const state_name = location_services[i]['state_name'];
    const animal_id = location_services[i]['animal_id'];
    const animal_type = location_services[i]['animal_type'];
    const service_id = location_services[i]['service_id'];
    const service_name = location_services[i]['service_name'];
    const service_cost = location_services[i]['service_cost'];

    if (!location[location_id])
      location[location_id] = {
        location_id: location_id,
        city_id: city_id,
        city_name: city_name,
        state_id: state_id,
        state_name: state_name,
        latitude: latitude,
        longitude: longitude,
        animals: {},
      };

    if (!location[location_id]['animals'][animal_id]) {
      const animalObj = {
        animal_id: animal_id,
        animal_type: animal_type,
        services: [],
      };
      location[location_id]['animals'][animal_id] = animalObj;
    }

    const service_obj = {
      location_service_id: location_service_id,
      service_id: service_id,
      service_name: service_name,
      service_cost: service_cost,
    };
    location[location_id]['animals'][animal_id]['services'].push(service_obj);
  }

  result['locations'] = [];

  Object.keys(location).forEach((key) => {
    result['locations'].push(location[key]);
  });

  Object.keys(result['locations']).forEach((key) => {
    const animals_arr = [];
    Object.keys(result['locations'][key]['animals']).forEach((key1) => {
      animals_arr.push(result['locations'][key]['animals'][key1]);
    });

    result['locations'][key]['animals'] = animals_arr;
  });

  return result['locations'];
}

module.exports = {
  findById,
  findAll,
  create,
  update,
  remove,
  findByLocationId,
  locationServiceObject,
  allLocationServicesObject,
  locationServiceByIDs,
  isUserLocation,
  isLocationServiceUnique,
};
