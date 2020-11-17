const express = require('express');
const authRequired = require('../middleware/authRequired');
const locationServiceModel = require('./locationServiceModel');
const router = express.Router();
const {
  validateLocationServiceID,
  validateLocationID,
  validateLocationServiceData,
  isLocationServiceUnique,
  isUserLocation,
} = require('../middleware/locationService');

/**
 * @swagger
 * components:
 *  schemas:
 *    LocationService:
 *      type: object
 *      required:
 *        - id
 *        - location_id
 *        - animal_id
 *        - service_id
 *        - service_cost
 *      properties:
 *        id:
 *          type: integer
 *          description: This is a primary key
 *        location_id:
 *          type: integer
 *        animal_id:
 *          type: integer
 *        service_id:
 *          type: integer
 *        service_cost:
 *          type: number
 *
 *
 * /locationService:
 *  get:
 *    description: Returns a list of locations including animals with their services
 *    summary: Get a list of all location including  animals with their services
 *    security:
 *      - okta: []
 *    tags:
 *      - locationService
 *    responses:
 *      200:
 *        description: array of location containting animals with their services
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/LocationService'
 *              example:
 *                - location_id: 3
 *                  city_id: 47633
 *                  city_name: 'Newark'
 *                  state_id: 3953
 *                  state_name: 'New Jersey'
 *                  latitude: '42.7478'
 *                  longitude: '73.7605'
 *                  animals:
 *                   - id: '1'
 *                     animal_type: 'Cat'
 *                     services:
 *                      - id: '1'
 *                        name: 'Haircut'
 *                      - id: '2'
 *                        name: 'Nail Cutting'
 *                   - id: '2'
 *                     animal_type: 'Dog'
 *                     services:
 *                      - id: '1'
 *                        name: 'Haircut'
 *                      - id: '2'
 *                        name: 'Nail Cutting'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', authRequired, async (req, res, next) => {
  try {
    const profile_id = req.profile.id;
    let location_services = await locationServiceModel.findAll(profile_id);
    location_services = locationServiceModel.allLocationServicesObject(
      location_services
    );
    res.json(location_services);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /locationService/{id}:
 *  get:
 *    description: Find location services by Location ID
 *    summary: Returns a  location containing animal with their services
 *    security:
 *      - okta: []
 *    tags:
 *      - locationService
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of the location
 *        required: true
 *    responses:
 *      200:
 *        description: A location object with all animals and their services
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LocationService'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Location services not found'
 */
router.get(
  '/:id',
  authRequired,
  validateLocationID(),
  async (req, res, next) => {
    try {
      const location_services = locationServiceModel.locationServiceObject(
        req.location_services
      );
      res.json(location_services);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /locationService:
 *  post:
 *    summary: Add a location with animal and service
 *    security:
 *      - okta: []
 *    tags:
 *      - locationService
 *    requestBody:
 *      description: Location object to be added
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LocationService'
 *    responses:
 *      400:
 *        description: 'Location Service already exists'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Missing location service data'
 *      200:
 *        description: A location service object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Location service created
 *                location:
 *                 $ref: '#/components/schemas/LocationService'
 *
 *
 *
 */
router.post(
  '/',
  authRequired,
  validateLocationServiceData(),
  isUserLocation(),
  isLocationServiceUnique(),
  async (req, res, next) => {
    try {
      const { location_id, animal_id, service_id, service_cost } = req.body;
      const payload = {
        location_id: location_id,
        animal_id: animal_id,
        service_id: service_id,
        service_cost: service_cost,
      };
      let location_service = await locationServiceModel.create(payload);
      location_service = await locationServiceModel.locationServiceByIDs(
        location_id,
        animal_id,
        service_id
      );
      return res.status(200).json({
        message: 'Location service created',
        location: location_service,
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /locationService:
 *  put:
 *    summary: Update a location service
 *    security:
 *      - okta: []
 *    tags:
 *      - locationService
 *    requestBody:
 *      description: Location Service object to be updated
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LocationService'
 *    responses:
 *      400:
 *        description: 'Location service already exists'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Invalid location service data'
 *      200:
 *        description: A location service object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Location service update
 *                animal:
 *                  $ref: '#/components/schemas/LocationService'
 */
router.put(
  '/',
  authRequired,
  validateLocationServiceData(),
  validateLocationServiceID(),
  isUserLocation(),
  isLocationServiceUnique(),
  async (req, res, next) => {
    try {
      const location_service_id = req.body.id;
      const { location_id, animal_id, service_id, service_cost } = req.body;
      const payload = {
        location_id: location_id,
        animal_id: animal_id,
        service_id: service_id,
        service_cost: service_cost,
      };

      let location_service = await locationServiceModel.update(
        location_service_id,
        payload
      );
      location_service = await locationServiceModel.locationServiceByIDs(
        location_id,
        animal_id,
        service_id
      );
      return res.status(200).json({
        message: 'Location service updated',
        location: location_service,
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /locationService/{id}:
 *  delete:
 *    summary: Remove a location service
 *    security:
 *      - okta: []
 *    tags:
 *      - locationService
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of the location_service
 *        required: true
 *        type: integer *
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A location service object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: location service was deleted.
 *                location:
 *                  $ref: '#/components/schemas/LocationService'
 */
router.delete(
  '/:id',
  authRequired,
  validateLocationServiceID(),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const location_service = await locationServiceModel.findById(id);
      await locationServiceModel.remove(id);
      return res.status(200).json({
        message: `Location service was deleted.`,
        location: location_service,
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
