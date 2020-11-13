const db = require('../../data/db-config');

const getUserAllLocations = async (profile_id) => {
  return await db('locations as l')
    .join('profiles as p', 'p.id', 'l.profile_id')
    .join('countries', 'countries.id', 'l.country_id')
    .join('states as s', 's.id', 'l.state_id')
    .join('cities as c', 'c.id', 'l.city_id')
    .where('p.id', profile_id)
    .select(
      'p.id as profile_id',
      'p.name',
      'p.email',
      'p.avatarUrl',
      'p.rating',
      'l.id as location_id',
      'l.address',
      'l.latitude',
      'l.longitude',
      'l.zip',
      'l.is_mobo',
      'l.phone_number',
      'countries.id as country_id',
      'countries.name as country_name',
      's.id as state_id',
      's.name as state_name',
      'c.id as city_id',
      'c.name as city_name'
    );
};

const findUserLocation = async (id, profile_id) => {
  return await db('locations as l')
    .join('profiles as p', 'p.id', 'l.profile_id')
    .join('countries', 'countries.id', 'l.country_id')
    .join('states as s', 's.id', 'l.state_id')
    .join('cities as c', 'c.id', 'l.city_id')
    .where('l.id', id)
    .where('l.profile_id', profile_id)
    .select(
      'p.id as profile_id',
      'p.name',
      'p.email',
      'p.avatarUrl',
      'p.rating',
      'l.id as location_id',
      'l.address',
      'l.latitude',
      'l.longitude',
      'l.is_mobo',
      'l.zip',
      'l.phone_number',
      'countries.id as country_id',
      'countries.name as country_name',
      's.id as state_id',
      's.name as state_name',
      'c.id as city_id',
      'c.name as city_name'
    );
};

const create = async (location) => {
  return db('locations').insert(location).returning('*');
};

const update = (id, location) => {
  return db('locations')
    .where({ id: id })
    .first()
    .update(location)
    .returning('*');
};

const remove = async (id) => {
  return await db('locations').where({ id }).del();
};

function getUserLocationsObject(user_locations) {
  location_by_user = {};

  user_locations.forEach((user_location) => {
    const id = user_location.profile_id;

    const user_obj = {
      id: id,
      name: user_location.name,
      email: user_location.email,
      avatarUrl: user_location.avatarUrl,
      rating: user_location.rating,
      locations: [],
    };

    if (!location_by_user[id]) {
      location_by_user[id] = user_obj;
    }

    // create location obj
    let location_obj = {
      id: user_location.location_id,
      address: user_location.address,
      is_mobo: user_location.is_mobo,
      zip: user_location.zip,
      phone_number: user_location.phone_number,
      latitude: user_location.latitude,
      longitude: user_location.longitude,
    };
    // add country object
    location_obj['country'] = {
      id: user_location.country_id,
      name: user_location.country_name,
    };
    // add state object
    location_obj['state'] = {
      id: user_location.state_id,
      name: user_location.state_name,
    };
    // add city object
    location_obj['city'] = {
      id: user_location.city_id,
      name: user_location.city_name,
    };
    location_by_user[id]['locations'].push(location_obj);
  });

  // Get value on first index
  location_by_user = location_by_user[Object.keys(location_by_user)[0]];

  return location_by_user;
}

module.exports = {
  getUserAllLocations,
  findUserLocation,
  create,
  update,
  remove,
  getUserLocationsObject,
};
