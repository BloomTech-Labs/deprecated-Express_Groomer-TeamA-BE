const db = require('../../data/db-config');

const findAll = async () => {
  return await db('services');
};

const findBy = (filter) => {
  return db('services').where(filter);
};

const findById = async (id) => {
  return db('services').where({ id }).first().select('*');
};

const create = async (animal) => {
  return db('services').insert(animal).returning('*');
};

const update = (id, animal) => {  
  return db('services')
    .where({ id: id })
    .first()
    .update(animal)
    .returning('*');
};

const remove = async (id) => {
  return await db('services').where({ id }).del();
};


module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove
};
