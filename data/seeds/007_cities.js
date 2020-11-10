exports.seed = async (knex) => {
  await knex('cities').insert([
    // Insert cities
    {
      id: '47633',
      name: 'Newark',
      state_id: '3953',
    },
    {
      id: '47634',
      name: 'Jersey City',
      state_id: '3953',
    },
    {
      id: '47635',
      name: 'Paterson',
      state_id: '3953',
    },
    {
      id: '47636',
      name: 'Elizabeth',
      state_id: '3953',
    },
    {
      id: '47637',
      name: 'Edison',
      state_id: '3953',
    },
    {
      id: '47638',
      name: 'Woodbridge',
      state_id: '3953',
    },
    {
      id: '47639',
      name: 'Lakewood',
      state_id: '3953',
    },

    {
      id: '47854',
      name: 'Airmont',
      state_id: '3956',
    },
    {
      id: '47855',
      name: 'Albany',
      state_id: '3956',
    },
    {
      id: '47856',
      name: 'Alden',
      state_id: '3956',
    },

    {
      id: '47857',
      name: 'Amherst',
      state_id: '3956',
    },
    {
      id: '47858',
      name: 'Amityville',
      state_id: '3956',
    },
    {
      id: '47860',
      name: 'Arcadia',
      state_id: '3956',
    },
  ]);
};
