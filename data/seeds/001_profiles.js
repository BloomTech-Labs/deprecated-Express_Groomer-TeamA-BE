const faker = require('faker');

const oktaProfiles = [
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

const groomers = [
  {
    id: '50db2bcb-270a-44af-abb6-af5467561100',
    user_type: 'Groomer',
    avatarUrl: faker.image.avatar(),
    email: faker.internet.email(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    certifications: ['Dogs', 'Cats'],
  },
  {
    id: '842da89e-56cf-4e8c-9164-08f8a23e6cc1',
    user_type: 'Groomer',
    avatarUrl: faker.image.avatar(),
    email: faker.internet.email(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    certifications: ['Dogs', 'Cats'],
  },
  {
    id: '71c6cea0-f653-48f5-8345-2af7c2e40631',
    user_type: 'Groomer',
    avatarUrl: faker.image.avatar(),
    email: faker.internet.email(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    certifications: ['Dogs', 'Cats'],
  },
  {
    id: '5c9817c8-8b4f-4837-a726-a1506c19b9f6',
    user_type: 'Groomer',
    avatarUrl: faker.image.avatar(),
    email: faker.internet.email(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    certifications: ['Dogs', 'Cats'],
  },
  {
    id: '00e1deca-72a6-4392-8288-467805027632',
    user_type: 'Groomer',
    avatarUrl: faker.image.avatar(),
    email: faker.internet.email(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    certifications: ['Dogs', 'Cats'],
  },
  {
    id: '0524b5fb-4335-4b72-addd-a8485ee4bd08',
    user_type: 'Groomer',
    avatarUrl: faker.image.avatar(),
    email: faker.internet.email(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    certifications: ['Dogs', 'Cats'],
  },
  {
    id: 'f6da0d64-5965-4c3c-b0e5-733646cea98c',
    user_type: 'Groomer',
    avatarUrl: faker.image.avatar(),
    email: faker.internet.email(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    certifications: ['Dogs', 'Cats'],
  },
  {
    id: '5ce25a3a-c387-4208-a668-057eb5975c48',
    user_type: 'Groomer',
    avatarUrl: faker.image.avatar(),
    email: faker.internet.email(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    certifications: ['Dogs', 'Cats'],
  },
  {
    id: '94a75178-b60e-47b4-8a64-7fd7d1a17660',
    user_type: 'Groomer',
    avatarUrl: faker.image.avatar(),
    email: faker.internet.email(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    certifications: ['Dogs', 'Cats'],
  },
  {
    id: 'ab7b2f78-dedd-492c-8bba-cb17a2391346',
    user_type: 'Groomer',
    avatarUrl: faker.image.avatar(),
    email: faker.internet.email(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    certifications: ['Dogs', 'Cats'],
  },
];

const profiles = [...oktaProfiles, ...groomers];

exports.seed = async (knex) => {
  // Insert profiles
  await knex('profiles').insert(profiles);
};
