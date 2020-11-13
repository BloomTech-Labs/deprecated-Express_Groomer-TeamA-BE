const Animals = require('../animal/animalModel');
const db = require('../../data/db-config');

module.exports = {
  validateAnimalID: () => {
    return async (req, res, next) => {
      try {
        const id = req.body.id || req.params.id;
        const animal = await Animals.findById(id);
        if (!animal) {
          res.status(404).json({ message: 'Animal not found.' });
        } else {
          req.animal = animal;
          next();
        }
      } catch (err) {
        next(err);
      }
    };
  },

  validateAnimalData: () => {
    return async (req, res, next) => {
      if (
        req.body.constructor === Object &&
        Object.keys(req.body).length === 0
      ) {
        res.status(404).json({ message: 'Missing animal data' });
      } else if (!req.body.animal_type) {
        res.status(404).json({ message: 'Missing animal type field' });
      } else {
        next();
      }
    };
  },

  isAnimalUnique: () => {
    return async (req, res, next) => {
      try {
        const animal_id = req.body.id;
        const animal_qry = db('animals').where(
          'animal_type',
          req.body.animal_type
        );
        if (animal_id) {
          animal_qry.whereNot('id', animal_id); // in case of update
        }

        if (await animal_qry.first()) {
          res.status(404).json({ message: 'Animal already exists.' });
        } else {
          next();
        }
      } catch (err) {
        next(err);
      }
    };
  },
};
