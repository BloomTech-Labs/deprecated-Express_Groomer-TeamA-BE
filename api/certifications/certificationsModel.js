const db = require('../../data/db-config');

const get = () => {};

const createCertificate = (certificate) => {
  return db('certifications').insert(certificate).returning('*');
};

const remove = () => {};

const update = () => {};

module.exports = {
  get,
  createCertificate,
  remove,
  update,
};
