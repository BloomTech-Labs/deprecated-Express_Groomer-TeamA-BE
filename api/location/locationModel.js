const db = require('../../data/db-config');

/*
        {
  "address": "917 Armstrong Blvd",
  "is_mobile": false,
  "zip": 80122,
  "phone_number": 884235223,
  "latitude": 18887.56,
  "longitude": 188767.56,
  "country": "USA",
  "state": "CO",
  "city": "Denver"
}*/

const getUserAllLocations = (profile_id) => {
  return db('locations as l')
    .join('profiles as p', 'p.id', 'l.profile_id')
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
      'l.is_mobile',
      'l.phone_number',
      'l.country',
      'l.state',
      'l.city'
    );
};

const findUserLocation = (id, profile_id) => {
  return db('locations as l')
    .join('profiles as p', 'p.id', 'l.profile_id')
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
      'l.is_mobile',
      'l.zip',
      'l.phone_number',
      'l.country',
      'l.state',
      'l.city'
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
  return db('locations').where({ id }).del();
};

function getUserLocationsObject(user_locations) {
  let location_by_user = {};

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
      is_mobile: user_location.is_mobile,
      zip: user_location.zip,
      phone_number: user_location.phone_number,
      latitude: user_location.latitude,
      longitude: user_location.longitude,
      country: user_location.country,
      state: user_location.state,
      city: user_location.city,
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
