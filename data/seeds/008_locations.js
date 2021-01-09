exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('locations')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('locations').insert([
        {
          id: 1,
          profile_id: '00ultwew80Onb2vOT4x6',
          address: '917 Armstrong Blvd',
          is_mobo: false,
          zip: 4042,
          phone_number: 884235223,
          latitude: 18887.56,
          longitude: 188767.56,
          country_id: 1,
          state_id: 1,
          city_id: 47633,
        },
      ]);
    });
};
