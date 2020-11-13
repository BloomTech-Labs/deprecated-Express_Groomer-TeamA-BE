const LocationModel = require('../location/locationModel');
const db = require('../../data/db-config');

module.exports = {
  validateLocationID: () => {
    return async (req, res, next) => {
      try {
        const id = req.body.id || req.params.id;
        // Logged in user id.
        const profile_id = req.profile.id;
        const location = await LocationModel.findUserLocation(id, profile_id);
        if (!location.length) {
          res.status(404).json({ message: 'Location not found.' });
        } else {
          req.location = location;
          next();
        }
      } catch (err) {
        next(err);
      }
    };
  },

  validateLocationData: () => {
    return async (req, res, next) => {
      if (
        req.body.constructor === Object &&
        Object.keys(req.body).length === 0
      ) {
        res.status(404).json({ message: 'missing location data' });
      } else if (
        !req.body.address ||
        !req.body.state_id ||
        !req.body.city_id ||
        !req.body.zip ||
        !req.body.phone_number ||
        req.body.latitude == '' ||
        !req.body.longitude
      ) {
        res.status(404).json({
          message:
            'missing address, state_id, city_id, zip, phone_number, latitude or longitude field',
        });
      } else {
        next();
      }
    };
  },

  isLocationUnique: () => {
    return async (req, res, next) => {
      try {
        const location_id = req.params.id || req.body.id;
        const location_qry = db('locations').where('address', req.body.address);
        if (location_id) {
          location_qry.whereNot('id', location_id); // in case of update
        }

        if (await location_qry.first()) {
          res.status(404).json({ message: 'Location alreday exist' });
        } else {
          next();
        }
      } catch (err) {
        next(err);
      }
    };
  },
};
