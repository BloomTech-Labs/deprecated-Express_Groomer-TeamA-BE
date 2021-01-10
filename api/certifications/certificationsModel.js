const db = require('../../data/db-config');


const getBy = (filter) => db('certifications').where(filter);

const createCertificate = (certificate) => {
  return db('certifications').insert(certificate).returning('*');
};

const remove = () => {};

const update = () => {};

module.exports = {
  createCertificate,
  getBy,
  remove,
  update,
};
