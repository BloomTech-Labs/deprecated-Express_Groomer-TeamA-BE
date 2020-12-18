const db = require('../../data/db-config');

const create = (appointment) => {
  return db('appointments').insert(appointment).returning('*');
};

module.exports = {
  create,
};
