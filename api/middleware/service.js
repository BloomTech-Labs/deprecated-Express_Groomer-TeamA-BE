const Services = require('../service/serviceModel');
const db = require('../../data/db-config');

module.exports = {
  validateServiceID: () => {
    return async (req, res, next) => {
      try {
        const id = req.body.id || req.params.id;
        const service = await Services.findById(id);
        if (!service) {
          res.status(404).json({ message: 'Service not found.' });
        } else {
          req.service = service;
          next();
        }
      } catch (err) {
        next(err);
      }
    };
  },

  validateServiceData: () => {
    return async (req, res, next) => {
      if (
        req.body.constructor === Object &&
        Object.keys(req.body).length === 0
      ) {
        res.status(404).json({ message: 'Missing service data' });
      } else if (!req.body.name) {
        res.status(404).json({ message: 'Missing service name field' });
      } else {
        next();
      }
    };
  },

  isServiceUnique: () => {
    return async (req, res, next) => {
      try {
        const service_id = req.body.id;
        const service_qry = db('services').where('name', req.body.name);
        if (service_id) {
          service_qry.whereNot('id', service_id); // in case of update
        }

        if (await service_qry.first()) {
          res.status(404).json({ message: 'Service already exists.' });
        } else {
          next();
        }
      } catch (err) {
        next(err);
      }
    };
  },
};
