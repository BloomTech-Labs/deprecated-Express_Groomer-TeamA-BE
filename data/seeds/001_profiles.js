const faker = require('faker');

const profiles = [
  {
    id: '00ulthapbErVUwVJy4x6',
    user_type: 'Customer',
    avatarUrl: faker.image.avatar(),
    email: 'llama001@maildrop.cc',
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    certifications: null,
  },
  {
    id: '00ultwew80Onb2vOT4x6',
    user_type: 'Groomer',
    avatarUrl: faker.image.avatar(),
    email: 'llama002@maildrop.cc',
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    certifications: ['Dogs', 'Cats'],
  },
  {
    id: '00ultx74kMUmEW8054x6',
    user_type: 'Customer',
    avatarUrl: faker.image.avatar(),
    email: 'llama003@maildrop.cc',
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    certifications: null,
  },
  {
    id: '00ultwqjtqt4VCcS24x6',
    user_type: 'Groomer',
    avatarUrl: faker.image.avatar(),
    email: 'llama004@maildrop.cc',
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    certifications: ['Dogs', 'Cats'],
  },
  {
    id: '00ultwz1n9ORpNFc04x6',
    user_type: 'Customer',
    avatarUrl: faker.image.avatar(),
    email: 'llama005@maildrop.cc',
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    certifications: null,
  },
  {
    id: '00u13omswyZM1xVya4x7',
    user_type: 'Groomer',
    avatarUrl: faker.image.avatar(),
    email: 'llama006@maildrop.cc',
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    certifications: ['Dogs', 'Cats'],
  },
  {
    id: '00u13ol5x1kmKxVJU4x7',
    user_type: 'Customer',
    avatarUrl: faker.image.avatar(),
    email: 'llama007@maildrop.cc',
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    certifications: null,
  },
  {
    id: '00u13oned0U8XP8Mb4x7',
    user_type: 'Groomer',
    avatarUrl: faker.image.avatar(),
    email: 'llama008@maildrop.cc',
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    certifications: ['Dogs', 'Cats'],
  },
];

exports.seed = async (knex) => {
  // Insert profiles
  await knex('profiles').insert(profiles);
};
