exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('certifications')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('certifications').insert([
        {
          groomer_id: '00ultwew80Onb2vOT4x6',
          title: 'Long-Legged Terriers',
          institute: 'Devry Institute of Dog Grooming',
          image:
            'https://headtotailpetgrooming.weebly.com/uploads/6/0/2/9/60294035/attendence_1_orig.jpg',
          date_issued: 1610224700,
          date_expired: 1925757500,
        },
      ]);
    });
};
