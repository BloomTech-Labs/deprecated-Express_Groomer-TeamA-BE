exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('customer_pets')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('customer_pets').insert([
        {
          id: 0,
          customer_id: '00ulthapbErVUwVJy4x6',
          animal_id: 2,
          pet_name: 'Rabby',
          color: 'Red',
          date_of_birth: '2020-11-02T00:00:00.000Z',
          image_url: 'https://s3.amazonaws.com/1.jpg',
          health_issue: 'Diabetes',
        },
      ]);
    });
};
