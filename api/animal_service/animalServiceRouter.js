const express = require('express');
const authRequired = require('../middleware/authRequired');
const animalServiceModel = require('./animalServiceModel');
const router = express.Router();
const {
  validateAnimalID,
  validateAnimal,
  validateService,
  validateRecord,
  validateAnimalServiceData,
  isAnimalServiceUnique,
} = require('../middleware/animalService');

/**
 * @swagger
 * components:
 *  schemas:
 *    AnimalService:
 *      type: object
 *      required:
 *        - id
 *        - animal_type
 *      properties:
 *        id:
 *          type: integer
 *          description: This is a primary key
 *        animal_type:
 *          type: string
 *        services:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Service'
 *
 *    AnimalServiceIDS:
 *      type: object
 *      required:
 *        - animal_id
 *        - service_id
 *      properties:
 *        animal_id:
 *          type: integer
 *        service_id:
 *          type: integer
 *
 * /animalService:
 *  get:
 *    description: Returns a list of animals with services
 *    summary: Get a list of all animals with services
 *    security:
 *      - okta: []
 *    tags:
 *      - animalService
 *    responses:
 *      200:
 *        description: array of animals with services
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/AnimalService'
 *              example:
 *                - id: '1'
 *                  animal_type: 'Cat'
 *                  services:
 *                    - id: '1'
 *                      name: 'Haircut'
 *                    - id: '2'
 *                      name: 'Nail Cutting'
 *                - id: '2'
 *                  animal_type: 'Dog'
 *                  services:
 *                    - id: '1'
 *                      name: 'Haircut'
 *                    - id: '2'
 *                      name: 'Nail Cutting'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', authRequired, async (req, res, next) => {
  try {
    const animal_services = await animalServiceModel.findAll();
    const services_by_animal = animalServiceModel.animalServicesObject(
      animal_services
    );
    res.json(services_by_animal);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /animalService/{animal_id}:
 *  get:
 *    description: Find services by animal ID
 *    summary: Returns a list of services by animal ID
 *    security:
 *      - okta: []
 *    tags:
 *      - animalService
 *    parameters:
 *      - name: animal_id
 *        in: path
 *        description: ID of the animal
 *        required: true
 *    responses:
 *      200:
 *        description: A animal object with all services
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AnimalService'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Animal services not found'
 */
router.get(
  '/:animal_id',
  authRequired,
  validateAnimalID(),
  async (req, res, next) => {
    try {
      const animal_services = animalServiceModel.animalServicesObject(
        req.animal_services
      );
      return res.status(200).json(animal_services[0]);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /animalService:
 *  post:
 *    summary: Add a animal with service
 *    security:
 *      - okta: []
 *    tags:
 *      - animalService
 *    requestBody:
 *      description: Animal object to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AnimalServiceIDS'
 *    responses:
 *      400:
 *        description: 'Animal Service already exists'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Missing animal service data'
 *      200:
 *        description: A animal service object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Animal Service created
 *                animal:
 *                  $ref: '#/components/schemas/AnimalService'
 */
router.post(
  '/',
  authRequired,
  validateAnimalServiceData(),
  validateAnimal(),
  validateService(),
  isAnimalServiceUnique(),
  async (req, res, next) => {
    try {
      const { service_id, animal_id } = req.body;
      const payload = {
        service_id: service_id,
        animal_id: animal_id,
      };
      let animal_service = await animalServiceModel.create(payload);
      animal_service = await animalServiceModel.animalServiceByIDs(
        animal_service[0].animal_id,
        animal_service[0].service_id
      );
      animal_service = animalServiceModel.animalServicesObject(animal_service);
      return res
        .status(200)
        .json({ message: 'Animal service created', animal: animal_service[0] });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /animalService/{animal_id}/{service_id}:
 *  put:
 *    summary: Update a animal service
 *    security:
 *      - okta: []
 *    tags:
 *      - animalService
 *    parameters:
 *      - name: animal_id
 *        in: path
 *        description: ID of the animal
 *        required: true
 *        type: integer
 *      - name: service_id
 *        in: path
 *        description: ID of the service
 *        required: true
 *        type: integer
 *    requestBody:
 *      description: Animal Service object to be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AnimalServiceIDS'
 *    responses:
 *      400:
 *        description: 'Animal service already exists'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Invalid animal service data'
 *      200:
 *        description: A animal service object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Animal service update
 *                animal:
 *                  $ref: '#/components/schemas/AnimalService'
 */
router.put(
  '/:animal_id/:service_id',
  authRequired,
  validateAnimalServiceData(),
  validateAnimal(),
  validateService(),
  validateRecord('update'),
  isAnimalServiceUnique(),
  async (req, res, next) => {
    try {
      const old_service_id = req.params.service_id;
      const old_animal_id = req.params.animal_id;
      const { service_id, animal_id } = req.body;
      const payload = {
        service_id: service_id,
        animal_id: animal_id,
      };

      let animal_service = await animalServiceModel.update(
        old_animal_id,
        old_service_id,
        payload
      );
      animal_service = await animalServiceModel.animalServiceByIDs(
        animal_service[0].animal_id,
        animal_service[0].service_id
      );
      animal_service = animalServiceModel.animalServicesObject(animal_service);
      return res
        .status(200)
        .json({ message: 'Animal service updated', animal: animal_service[0] });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /animalService/{animal_id}/{service_id}:
 *  delete:
 *    summary: Remove a animal service
 *    security:
 *      - okta: []
 *    tags:
 *      - animalService
 *    parameters:
 *      - name: animal_id
 *        in: path
 *        description: ID of the animal
 *        required: true
 *        type: integer
 *      - name: service_id
 *        in: path
 *        description: ID of the service
 *        required: true
 *        type: integer
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A animal service object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Animal service was deleted.
 *                animal:
 *                  $ref: '#/components/schemas/AnimalService'
 */
router.delete(
  '/:animal_id/:service_id',
  authRequired,
  validateRecord('delete'),
  async (req, res, next) => {
    try {
      const service_id = req.params.service_id;
      const animal_id = req.params.animal_id;
      await animalServiceModel.remove(animal_id, service_id);
      const animal_service = animalServiceModel.animalServicesObject(
        req.animal_service
      );
      return res
        .status(200)
        .json({
          message: `Animal service was deleted.`,
          animal: animal_service[0],
        });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
