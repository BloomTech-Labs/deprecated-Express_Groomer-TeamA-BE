const CustomerPetModel = require('../customer_pet/customerPetModel');
const db = require('../../data/db-config');

module.exports = {
  validateCustomerPetID: () => {
    return async (req, res, next) => {
      try {
        const id = req.body.id || req.params.id;
        // Logged in user id.
        const profile_id = req.profile.id;
        const customer_pet = await CustomerPetModel.findCustomerPet(
          id,
          profile_id
        );
        if (!customer_pet.length) {
          res.status(404).json({ message: 'Customer pet not found.' });
        } else {
          req.customer_pet = customer_pet;
          next();
        }
      } catch (err) {
        next(err);
      }
    };
  },

  validateCustomerPetData: () => {
    return async (req, res, next) => {
      if (
        req.body.constructor === Object &&
        Object.keys(req.body).length === 0
      ) {
        res.status(404).json({ message: 'missing customer pet data' });
      } else if (!req.body.animal_id || !req.body.pet_name) {
        res
          .status(404)
          .json({ message: 'missing animal_id or pet_name field' });
      } else {
        next();
      }
    };
  },

  isPetUnique: () => {
    return async (req, res, next) => {
      try {
        // Logged in user id.
        const profile_id = req.profile.id;
        const pet_id = req.params.id || req.body.id;
        const customer_pet_qry = db('customer_pets')
          .where('pet_name', req.body.pet_name)
          .where('customer_id', profile_id);
        if (pet_id) {
          customer_pet_qry.whereNot('id', pet_id); // in case of update
        }

        if (await customer_pet_qry.first()) {
          res.status(404).json({ message: 'Pet alreday exist' });
        } else {
          next();
        }
      } catch (err) {
        next(err);
      }
    };
  },
};
