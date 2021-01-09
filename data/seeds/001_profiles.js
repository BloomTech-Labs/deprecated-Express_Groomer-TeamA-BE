const faker = require('faker');

const profiles = [...new Array(5)].map((i, idx) => ({
  id:
    idx === 0
      ? '00ulthapbErVUwVJy4x6'
      : idx === 2
      ? 'yonp6i2k2xll5qq8mvgq'
      : faker.random.alphaNumeric(20),
  user_type: parseInt(idx) <= 1 ? 'Customer' : 'Groomer',
  avatarUrl: faker.image.avatar(),
  email: idx === 0 ? 'llama001@maildrop.cc"' : faker.internet.email(),
  name:
    idx === 0
      ? 'Test001 User'
      : `${faker.name.firstName()} ${faker.name.lastName()}`,
}));

exports.seed = async (knex) => {
  // Insert profiles
  await knex('profiles').insert(profiles);
};
