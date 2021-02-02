exports.seed = async (knex) => {
  // Insert services entries
  await knex('services').insert([
    { name: 'Bath' },
    { name: 'Haircut' },
    { name: 'Nail Trim' },
    { name: 'Nail Grind' },
    { name: 'Ear Cleaning' },
    { name: 'Teeth Brushing' },
    { name: 'Blow-dry' },
    { name: 'Deep-cleaning shampoo' },
    { name: 'Anal Gland Expression' },
    { name: 'Flea & Tick Services' },
  ]);
};
