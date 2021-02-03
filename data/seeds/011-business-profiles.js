const faker = require('faker');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('business_profiles')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('business_profiles').insert([
        {
          profile_id: '00ultwew80Onb2vOT4x6',
          groomer_service_heading: 'professional pet care services',
          business_name: faker.company.companyName(),
          service_intro: faker.company.catchPhrase(),
          why_choose_description: faker.lorem.paragraphs(2),
        },
        {
          profile_id: '00ultwqjtqt4VCcS24x6',
          groomer_service_heading: 'professional pet care services',
          business_name: faker.company.companyName(),
          service_intro: faker.company.catchPhrase(),
          why_choose_description: faker.lorem.paragraphs(2),
        },
        {
          profile_id: '00u13omswyZM1xVya4x7',
          groomer_service_heading: 'professional pet care services',
          business_name: faker.company.companyName(),
          service_intro: faker.company.catchPhrase(),
          why_choose_description: faker.lorem.paragraphs(2),
        },
        {
          profile_id: '00u13oned0U8XP8Mb4x7',
          groomer_service_heading: 'professional pet care services',
          business_name: faker.company.companyName(),
          service_intro: faker.company.catchPhrase(),
          why_choose_description: faker.lorem.paragraphs(2),
        },
        {
          profile_id: '50db2bcb-270a-44af-abb6-af5467561100',
          groomer_service_heading: 'professional pet care services',
          business_name: faker.company.companyName(),
          service_intro: faker.company.catchPhrase(),
          why_choose_description: faker.lorem.paragraphs(2),
        },
        {
          profile_id: '842da89e-56cf-4e8c-9164-08f8a23e6cc1',
          groomer_service_heading: 'professional pet care services',
          business_name: faker.company.companyName(),
          service_intro: faker.company.catchPhrase(),
          why_choose_description: faker.lorem.paragraphs(2),
        },
        {
          profile_id: '71c6cea0-f653-48f5-8345-2af7c2e40631',
          groomer_service_heading: 'professional pet care services',
          business_name: faker.company.companyName(),
          service_intro: faker.company.catchPhrase(),
          why_choose_description: faker.lorem.paragraphs(2),
        },
        {
          profile_id: '5c9817c8-8b4f-4837-a726-a1506c19b9f6',
          groomer_service_heading: 'professional pet care services',
          business_name: faker.company.companyName(),
          service_intro: faker.company.catchPhrase(),
          why_choose_description: faker.lorem.paragraphs(2),
        },
        {
          profile_id: '00e1deca-72a6-4392-8288-467805027632',
          groomer_service_heading: 'professional pet care services',
          business_name: faker.company.companyName(),
          service_intro: faker.company.catchPhrase(),
          why_choose_description: faker.lorem.paragraphs(2),
        },
        {
          profile_id: '0524b5fb-4335-4b72-addd-a8485ee4bd08',
          groomer_service_heading: 'professional pet care services',
          business_name: faker.company.companyName(),
          service_intro: faker.company.catchPhrase(),
          why_choose_description: faker.lorem.paragraphs(2),
        },
        {
          profile_id: 'f6da0d64-5965-4c3c-b0e5-733646cea98c',
          groomer_service_heading: 'professional pet care services',
          business_name: faker.company.companyName(),
          service_intro: faker.company.catchPhrase(),
          why_choose_description: faker.lorem.paragraphs(2),
        },
        {
          profile_id: '5ce25a3a-c387-4208-a668-057eb5975c48',
          groomer_service_heading: 'professional pet care services',
          business_name: faker.company.companyName(),
          service_intro: faker.company.catchPhrase(),
          why_choose_description: faker.lorem.paragraphs(2),
        },
        {
          profile_id: '94a75178-b60e-47b4-8a64-7fd7d1a17660',
          groomer_service_heading: 'professional pet care services',
          business_name: faker.company.companyName(),
          service_intro: faker.company.catchPhrase(),
          why_choose_description: faker.lorem.paragraphs(2),
        },
        {
          profile_id: 'ab7b2f78-dedd-492c-8bba-cb17a2391346',
          groomer_service_heading: 'professional pet care services',
          business_name: faker.company.companyName(),
          service_intro: faker.company.catchPhrase(),
          why_choose_description: faker.lorem.paragraphs(2),
        },
      ]);
    });
};
