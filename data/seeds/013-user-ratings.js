exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('user_ratings')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('user_ratings').insert([
        {
          id: 0,
          groomer_id: '00ultwew80Onb2vOT4x6',
          customer_id: '00ulthapbErVUwVJy4x6',
          location_service_id: 0,
          review_point: 3,
          feedback: 'washed pet rock well.',
        },
      ]);
    });
};
