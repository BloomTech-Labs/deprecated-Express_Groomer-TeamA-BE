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
          address: '200 E Colfax Ave',
          is_mobile: false,
          zip: 80203,
          phone_number: 3038675309,
          latitude: 39.7394444,
          longitude: -104.985,
          country: 'United States of America',
          state: 'Colorado',
          city: 'Denver',
        },
      ]);
    });
};
