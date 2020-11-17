const db = require('../../data/db-config');

const findAll = async () => {
  let qry = db('locations as l')
    .join('profiles as p', 'p.id', 'l.profile_id')
    .join('location_services as ls', 'ls.location_id', 'l.id')
    .join('services as s', 's.id', 'ls.service_id')
    .join('animals as a', 'a.id', 'ls.animal_id')
    .join('states as stat', 'stat.id', 'l.state_id')
    .join('cities as c', 'c.id', 'l.city_id')
    .select(
      'p.name',
      'p.email',
      'l.profile_id',
      'ls.location_id',
      'l.latitude',
      'l.longitude',
      'l.address',
      'l.state_id',
      'l.city_id',
      'stat.name as state_name',
      'c.name as city_name',
      'ls.service_id',
      's.name as service_name',
      'ls.animal_id',
      'a.animal_type as animal_type',
      'ls.service_cost'
    )
    .where('p.user_type', 'Groomer');

  return await qry;
};

module.exports = {
  findAll,
};
