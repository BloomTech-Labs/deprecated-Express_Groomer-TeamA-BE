const LocationServices = require('../location_service/locationServiceModel');

module.exports = {
  validateLocationServiceID: () => {
    return async (req, res, next) => {
      try {
        const location_service_id = req.params.id || req.body.id;
        const location_service = await LocationServices.findById(
          location_service_id
        );
        if (!location_service) {
          res.status(404).json({ message: 'Location service not found.' });
        } else {
          req.location_services = location_service;
          next();
        }
      } catch (err) {
        next(err);
      }
    };
  },

  validateLocationID: () => {
    return async (req, res, next) => {
      try {
        const profile_id = req.profile.id;
        const location_id = req.params.id;
        const location_services = await LocationServices.findByLocationId(
          location_id,
          profile_id
        );
        if (!location_services.length) {
          res.status(404).json({ message: 'Location service not found.' });
        } else {
          req.location_services = location_services;
          next();
        }
      } catch (err) {
        next(err);
      }
    };
  },

  validateLocationServiceData: () => {
    return async (req, res, next) => {
      if (
        req.body.constructor === Object &&
        Object.keys(req.body).length === 0
      ) {
        res.status(404).json({ message: 'Missing location service data' });
      } else if (
        !req.body.location_id ||
        !req.body.animal_id ||
        !req.body.service_id ||
        !req.body.service_cost
      ) {
        res
          .status(404)
          .json({
            message:
              'Missing  location ID, animail ID, service ID or Service Cost',
          });
      } else {
        next();
      }
    };
  },

  isUserLocation: () => {
    return async (req, res, next) => {
      try {
        const profile_id = req.profile.id;
        const location_id = req.body.location_id;
        const service_qry = await LocationServices.isUserLocation(
          location_id,
          profile_id
        );
        if (!service_qry) {
          res.status(404).json({ message: 'Invalid location ID' });
        } else {
          next();
        }
      } catch (err) {
        next(err);
      }
    };
  },

  isLocationServiceUnique: () => {
    return async (req, res, next) => {
      try {
        const location_service_id = req.params.id || req.body.id;
        const { location_id, animal_id, service_id } = req.body;
        const service_qry = await LocationServices.isLocationServiceUnique(
          location_id,
          animal_id,
          service_id,
          location_service_id
        );
        if (service_qry) {
          res.status(404).json({ message: 'Location Service alreday exists' });
        } else {
          next();
        }
      } catch (err) {
        next(err);
      }
    };
  },
};
