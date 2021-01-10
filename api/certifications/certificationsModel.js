const db = require('../../data/db-config');

const getBy = (filter) => db('certifications').where(filter);

const create = () => {};

const remove = () => {};

const update = () => {};

module.exports = {
  getBy,
  create,
  remove,
  update,
};
