const db = require('../../data/db-config');

const get = () => {};

const createCertificate = (certificate) => {
  return db('certificates').insert(certificate).returning('*');
};

const remove = () => {};

const update = () => {};

module.exports = {
  get,
  createCertificate,
  remove,
  update,
};
