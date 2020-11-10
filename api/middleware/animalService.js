const AnimalServices = require('../animal_service/animalServiceModel');
const Services = require('../service/serviceModel');
const Animals = require('../animal/animalModel');
const db = require('../../data/db-config');
const animal = require('./animal');

module.exports = {
  validateAnimalID: () => {
    return async (req, res, next) => {
      try {        
        const animal_id = req.params.animal_id
        const animal_services = await AnimalServices.findById(animal_id);       
        if (!animal_services.length) {
          res.status(404).json({ message: 'Animal not found.' });
        } else {
          req.animal_services = animal_services;
          next();
        }
      } catch (err) {
        next(err);
      }
    };
  },

  validateAnimal: () => {
    return async (req, res, next) => {
      try {        
        const animal_id = req.body.animal_id
        const animal = await Animals.findById(animal_id);     
        if (!animal) {
          res.status(404).json({ message: 'Animal not found.' });
        } else {          
          next();
        }
      } catch (err) {
        next(err);
      }
    };
  },

  validateService: () => {
    return async (req, res, next) => {
      try {        
        const service_id = req.body.service_id
        const service = await Services.findById(service_id);       
        if (!service) {
          res.status(404).json({ message: 'Service not found.' });
        } else {         
          next();
        }
      } catch (err) {
        next(err);
      }
    };
  },

  validateRecord: (action) => {
    return async (req, res, next) => {
      try {        
        
          const {animal_id, service_id} = req.params;   
          const animal_service = await AnimalServices.animalServiceByIDs(animal_id, service_id)   
            
          if(animal_service.length === 0) {         
            res.status(404).json({ message: 'Record not found.'});
          } else {
              if(action == 'delete') {
                req.animal_service = animal_service
                next();
              } else if(action == 'update') {             
                next();
              }           
          }
      
      } catch (err) {
        next(err);
      }
    };
  },

  validateAnimalServiceData: () => {
    return async (req, res, next) => {
      if (
        req.body.constructor === Object &&
        Object.keys(req.body).length === 0
      ) {
        res.status(404).json({ message: 'Missing animal service data' });
      } else if (!req.body.animal_id || !req.body.service_id) {
        res.status(404).json({ message: 'Missing  animal ID or Service ID' });
      } else {
        next();
      }
    };
  },

  isAnimalServiceUnique: () => {
    return async (req, res, next) => {
      try {
        const {animal_id, service_id} = req.body;
        const service_qry = db('animal_services')
                            .where('animal_id', animal_id)
                            .where('service_id', service_id);

        if (await service_qry.first()) {
          res.status(404).json({ message: 'Animal Service alreday exist' });
        } else {
          next();
        }
      } catch (err) {
        next(err);
      }
    };
  },
};
