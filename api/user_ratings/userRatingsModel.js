const db = require('../../data/db-config');

const getAll = () => db('user_ratings').select('*');

const getAllBy = (filter) => db('user_ratings').where(filter).select('*');

const getBy = (filter) => db('user_ratings').where(filter).select('*');

const create = (review) => db('user_ratings').insert(review).returning('*');

const remove = async (id) => {
  const [deleted] = await getBy({ id });
  await db('user_ratings').where({ id }).first().delete();
  console.log({ origin: 'remove', deleted });

  return deleted;
};
const update = (id, changes) => {
  return db('user_ratings').where({ id }).update(changes).returning('*');
};

module.exports = {
  getAll,
  getAllBy,
  getBy,
  create,
  remove,
  update,
};
