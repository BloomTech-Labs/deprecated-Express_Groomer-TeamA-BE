const db = require('../../data/db-config');

const getBy = (filter) => db('certifications').where(filter);

const getById = (id) => {
  console.info(id);
  return db('certifications').where({ id }).first().select('*');
};

const createCertificate = (certificate) => {
  return db('certifications').insert(certificate).returning('*');
};

const remove = () => {};

const update = () => {};

module.exports = {
  createCertificate,
  getBy,
  getById,
  remove,
  update,
};
