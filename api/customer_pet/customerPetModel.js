const db = require('../../data/db-config');

const getCustomerAllPets = async (profile_id) => {
  return await db('customer_pets as cp')
    .join('profiles as p', 'p.id', 'cp.customer_id')
    .join('animals as a', 'a.id', 'cp.animal_id')
    .where('cp.customer_id', profile_id)
    .select(
      'p.id as profile_id',
      'p.name',
      'p.email',
      'p.avatarUrl',
      'p.rating',
      'cp.id',
      'a.id as animal_id',
      'a.animal_type',
      'cp.pet_name',
      'cp.color',
      'cp.date_of_birth',
      'cp.image_url'
    );
};

const findCustomerPet = async (pet_id, profile_id) => {
  return await db('customer_pets as cp')
    .join('profiles as p', 'p.id', 'cp.customer_id')
    .join('animals as a', 'a.id', 'cp.animal_id')
    .where('cp.id', pet_id)
    .where('cp.customer_id', profile_id)
    .select(
      'p.id as profile_id',
      'p.name',
      'p.email',
      'p.avatarUrl',
      'p.rating',
      'cp.id',
      'a.id as animal_id',
      'a.animal_type',
      'cp.pet_name',
      'cp.color',
      'cp.date_of_birth',
      'cp.image_url'
    );
};

const create = async (customer_pet) => {
  return db('customer_pets').insert(customer_pet).returning('*');
};

const update = (id, customer_pet) => {
  return db('customer_pets')
    .where({ id: id })
    .first()
    .update(customer_pet)
    .returning('*');
};

const remove = async (id) => {
  return await db('customer_pets').where({ id }).del();
};

function customerPetsObject(customer_pets) {
  let pets_by_customer = {};

  customer_pets.forEach(function (customer_pet) {
    const id = customer_pet.profile_id;

    const customer_obj = {
      id: id,
      name: customer_pet.name,
      email: customer_pet.email,
      avatarUrl: customer_pet.avatarUrl,
      rating: customer_pet.rating,
      pets: [],
    };

    if (!pets_by_customer[id]) {
      pets_by_customer[id] = customer_obj;
    }

    // create pet object.
    const pet_obj = {
      id: customer_pet.id,
      pet_name: customer_pet.pet_name,
      color: customer_pet.color,
      date_of_birth: customer_pet.date_of_birth,
      image_url: customer_pet.image_url,
    };

    // add animal object
    pet_obj['animal'] = {
      id: customer_pet.animal_id,
      animal_type: customer_pet.animal_type,
    };
    pets_by_customer[id]['pets'].push(pet_obj);
  });

  // Get value on first index
  pets_by_customer = pets_by_customer[Object.keys(pets_by_customer)[0]];

  return pets_by_customer;
}

module.exports = {
  findCustomerPet,
  create,
  update,
  remove,
  getCustomerAllPets,
  customerPetsObject,
};
