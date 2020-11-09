const db = require('../../data/db-config');

const findAll = async () => {
  return await db('animals');
};

const findBy = (filter) => {
  return db('animals').where(filter);
};

const findById = async (id) => {
  return db('animals').where({ id }).first().select('*');
};

const create = async (animal) => {
  return db('animals').insert(animal).returning('*');
};

const update = (id, animal) => {  
  return db('animals')
    .where({ id: id })
    .first()
    .update(animal)
    .returning('*');
};

const remove = async (id) => {
  return await db('animals').where({ id }).del();
};


module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove
};
